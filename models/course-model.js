const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    standred: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('Course', courseSchema)
