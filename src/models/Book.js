const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const transformReturnedObj = require('../utils/transformReturnedObj')

const bookSchema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    author: { type: String, required: true },
    review: { type: String, required: true, unique: true },
    image: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

transformReturnedObj(bookSchema)

bookSchema.plugin(uniqueValidator)

const Book = model('Book', bookSchema)

module.exports = Book
