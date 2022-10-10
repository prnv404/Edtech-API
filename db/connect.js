import mongoose from 'mongoose'

const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
