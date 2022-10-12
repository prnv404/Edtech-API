import dotenv from 'dotenv'
dotenv.config()
import expressAsyncHandler from 'express-async-handler'
import connectDB from './db/connect.js'
import User from './models/user-model.js'

const start = async (url) => {
  try {
    await connectDB(url)
    await User.deleteMany({})
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}

start(process.env.MONGO_URL)
