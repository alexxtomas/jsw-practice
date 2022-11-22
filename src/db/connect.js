const { connect, default: mongoose } = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const MONGODB_URI = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

connect(MONGODB_URI)
  .then(() => console.log(`Connected to MONGODB ✅`))
  .catch((e) => console.error(e))

process.on('uncaughtException', (e) => {
  console.error(e)
  mongoose.disconnect()
})
