const jwt = require('jsonwebtoken')
const bycript = require('bcrypt')
const User = require('../models/User')

const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
  const { body } = req
  const { username, password } = body

  const user = await User.findOne({ username })
  const correctPassword = user
    ? await bycript.compare(password, user.passwordHash)
    : false

  if (!(user && correctPassword))
    res.status(401).json({ error: 'Invalid user or password' })

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    // Expires in one week
    {
      expiresIn: 60 * 60 * 24 * 7
    }
  )

  res.send({
    username: user.username,
    token
  })
})

module.exports = loginRouter
