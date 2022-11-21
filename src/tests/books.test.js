const { mongoose } = require('mongoose')
const { server } = require('../index')
const Book = require('../models/Book')
const {
  api,
  initialBooks,
  getAllTitlesAndAuthorsFromBooks
} = require('./helpers')

beforeEach(async () => {
  await Book.deleteMany({})

  for (const book of initialBooks) {
    const bookObj = new Book(book)
    await bookObj.save()
  }
})

describe('GET /api/books', () => {
  test('books are returned as json', async () => {
    await api
      .get('/books')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  // TODO -> MORE TESTS
})

describe('POST /books', () => {
  test('a valid book can be added', async () => {
    // TODO -> COMPLETE TEST 'A VALID BOOK CAN BE ADDED' ADD A VALID USERID
    const newBook = {
      title: 'Codigo medio limpio',
      author: 'Ramiro Lopez',
      userId: '...'
    }

    await api
      .post('/books')
      .send(newBook)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { titles, authors, response } =
      await getAllTitlesAndAuthorsFromBooks()

    expect(response.body).toHaveLength(initialBooks + 1)
    expect(titles).toContain(newBook.title)
    expect(authors).toContain(newBook.author)
  })
  // TODO -> ADD MORE TESTS
})
