const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose')
const transformReturnedObj = require('../utils/transformReturnedObj')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    passwordHash: String,
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book'
      }
    ]
  },
  {
    timestamps: true
  }
)

transformReturnedObj(userSchema)
userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User
