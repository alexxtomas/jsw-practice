require('dotenv').config()
require('./db/connect.js')
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const handleErrors = require('./middlewares/handleErrors')

const testingRouter = require('./controllers/testing.js')
const loginRouter = require('./controllers/login.js')
const booksRouter = require('./controllers/books.js')
const usersRouter = require('./controllers/users.js')

const app = express()

// CONFIG
app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ limit: '1mb', extended: true }))
app.disable('x-powered-by')

// ROUTERS
app.use('/login', loginRouter)
app.use('/books', booksRouter)
app.use('/users', usersRouter)

// ERROR MIDDLEWARES
app.use(notFound)
app.use(handleErrors)

if (process.env.NODE_ENV === 'test') app.use('/api/testing', testingRouter)

const server = app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
)

module.exports = { app, server }
