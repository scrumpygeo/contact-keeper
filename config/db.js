require('dotenv').config()
const mongoose = require('mongoose')

const db = process.env.mongoURI

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })

    console.log('MongoDB connected.')
  } catch (err) {
    console.error(err.message)
    process.exit(1) // exit with failure
  }
}

module.exports = connectDB
