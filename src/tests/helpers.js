const { app } = require('../index')
const supertest = require('supertest')

const api = supertest(app)
const initialBooks = [
  {
    author: 'Alex Tomas',
    title: 'Codigo limpio',
    review: 'Great Book!'
  },
  {
    author: 'Pepe Gonzalez',
    title: 'Codigo Sucio',
    review: 'Wrong Book!'
  }
]

const getAllTitlesAndAuthorsFromBooks = async () => {
  const response = await api.get('/books')

  return {
    titles: response.body.map((book) => book.title),
    authors: response.body.map((book) => book.author),
    response
  }
}

module.exports = { api, initialBooks, getAllTitlesAndAuthorsFromBooks }
