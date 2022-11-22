const Book = require('../models/Book')
const User = require('../models/User')

const booksRouter = require('express').Router()
const userExtractor = require('../middlewares/userExtractor')
const { deleteFile } = require('../services/cloudinary')
const upload = require('../middlewares/upload')

booksRouter.get('/', async (req, res) => {
  const books = await Book.find({}).populate('user', { username: 1 })
  res.json(books)
})

booksRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  const book = await Book.findById(id).populate('user', { username: 1 })

  if (!book) res.status(404).end()

  res.json(book)
})

booksRouter.delete('/:id', userExtractor, async (req, res) => {
  const { id } = req.params

  const deletedBook = await Book.findByIdAndRemove(id)
  if (deletedBook.image) deleteFile(deletedBook.image)
  res.status(204).end()
})

booksRouter.put(
  '/:id',
  [upload.single('image'), userExtractor],
  async (req, res) => {
    const { id } = req.params
    const { title, author, review, image } = req.body

    if (!title || !author || !review || !image)
      res.status(400).json({
        error: 'Title, author , review or image is requeried to modify book'
      })

    const newBookInfo = {
      title,
      author,
      review,
      image
    }

    const updatedBook = await Book.findByIdAndUpdate(id, newBookInfo, {
      new: true
    })

    if (req.file) {
      deleteFile(image)
      newBookInfo.image = req.file.path
    }
    if (!updatedBook)
      res.status(404).json({ error: 'This book does not exist' })

    res.json(updatedBook)
  }
)

booksRouter.post(
  '/',
  [upload.single('image'), userExtractor],
  async (req, res) => {
    const { title, author, review, image } = req.body

    const { userId } = req
    console.log(userId)
    const users = await User.find({})
    console.log(users)

    const user = await User.findById(userId)

    if (!title) res.status(400).json({ error: 'Title field is missing' })
    if (!author) res.status(400).json({ error: 'Author field is missing' })
    if (!review) res.status(400).json({ error: 'Review field is missing' })

    const newBook = new Book({
      author,
      review,
      title,
      image,
      user: user._id
    })
    if (req.file) newBook.image = req.file.path

    const saveBook = await newBook.save()
    user.books = user.books.concat(saveBook._id)
    await user.save()

    res.json(saveBook)
  }
)

module.exports = booksRouter
