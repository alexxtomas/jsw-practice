const Book = require('../models/Book')
const User = require('../models/Book')

const booksRouter = require('express').Router()
const userExtractor = require('../middlewares/userExtractor')

booksRouter.get('/', async (req, res) => {
  const books = await Book.find({}).populate('user', { username: 1 })
  res.json(books)
})

booksRouter('/:id', async (req, res) => {
  const { id } = req.params

  const book = await Book.findById(id).populate('user', { username: 1 })

  if (!book) res.status(404).end()

  res.json(book)
})

booksRouter.delete('/:id', userExtractor, async (req, res) => {
  const { id } = req.params

  await Book.findByIdAndRemove(id)
  res.status(204).end()
})

booksRouter.put('/:id', userExtractor, async (req, res) => {
  const { id } = req.params
  const book = req.body

  if (!book.title || !book.author || !book.review)
    res.status(400).json({
      error: 'Title, author or description is requeried to modify book'
    })

  const newBookInfo = {
    title: book.title,
    author: book.author,
    review: book.review
  }

  const updatedBook = await Book.findByIdAndUpdate(id, newBookInfo, {
    new: true
  })

  if (!updatedBook) res.status(404).json({ error: 'This book does not exist' })

  res.json(updatedBook)
})

booksRouter.post('/', userExtractor, async (req, res) => {
  const { title, author, review } = req.body

  const { userId } = req

  const user = await User.findById(userId)

  if (!title) res.status(400).json({ error: 'Title field is missing' })
  if (!author) res.status(400).json({ error: 'Author field is missing' })
  if (!review) res.status(400).json({ error: 'Review field is missing' })

  const newBook = new Book({
    author,
    review,
    title,
    user: user._id
  })

  const saveBook = await newBook.save()
  user.books = user.books.concat(saveBook._id)
  await user.save()

  res.json(saveBook)
})

module.exports = booksRouter
