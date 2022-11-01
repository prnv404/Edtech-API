const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({
    standred: {
        type: String,
        required: [true, 'subject have standred'],
    },
    subject: {
        type: String,
        required: [true, 'subject have subject'],
    },
})

module.exports = mongoose.model('Subject', subjectSchema)
