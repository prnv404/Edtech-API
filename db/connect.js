const mongoose = require('mongoose')

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

module.exports = connectDB
