import mongoose from 'mongoose'
const subjectSchema = mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'please provide subject name'],
  },
  class: {
    type: String,
    required: [true, 'pleaes provide class'],
  },
})

const Subject = mongoose.model('Subject', subjectSchema)
export default Subject
