const dotenv = require('dotenv')

dotenv.config()
const expressAsyncHandler = require('express-async-handler')
const connectDB = require('./db/connect')
const User = require('./models/user-model')

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
