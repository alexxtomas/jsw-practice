const testingRouter = require('express').Router()

const User = require('../models/User')
const Book = require('../models/Book')

testingRouter.post('/reset', async (req, res) => {
  await User.deleteMany({})
  await Book.deleteMany({})

  res.status(204).end()
})

module.exports = testingRouter
