module.exports = (schema) => {
  schema.set('toJSON', {
    transform: (_, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v

      delete returnedObject.passwordHash
    }
  })
}
