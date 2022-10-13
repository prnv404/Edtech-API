import dotenv from 'dotenv'
dotenv.config()
import expressAsyncHandler from 'express-async-handler'
import connectDB from './db/connect.js'
import User from './models/user-model.js'
import fs from 'fs'
const data = fs.readFileSync('./edtech.json', (err, data) => {
  console.log(data)
})

console.log(data)

const start = async (url) => {
  try {
    await connectDB(url)
    // await User.deleteMany({})
    await User.insertMany({ data })
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}

start(process.env.MONGO_URL)
