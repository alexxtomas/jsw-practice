const bcrypt = require('bcrypt')
const User = require('../models/User')
const usersRouter = require('express').Router()

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('books', {
    title: 1,
    author: 1,
    review: 1
  })

  res.json(users)
})

usersRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  const user = await User.findById(id).populate('books', {
    title: 1,
    author: 1,
    review: 1
  })
  res.json(user)
})

usersRouter.post('/', async (req, res) => {
  try {
    const { body } = req
    const { username, password } = body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      passwordHash
    })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch ({ errors }) {
    res.status(400).json(errors.username.message)
  }
})

module.exports = usersRouter
