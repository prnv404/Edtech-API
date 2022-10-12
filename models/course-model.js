import mongoose from 'mongoose'
const CourseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide a name'],
    },
    image: {
      type: String,
      required: [true, 'please provide a image'],
    },
    video: {
      type: String,
      required: [true, 'please provide a video'],
    },
    subject: {
      type: String,
      enum: ['physics', 'chemistry', 'biology', 'maths', 'computer science'],
      required: [true, 'please provide subject'],
    },
    class: {
      type: String,
      enum: ['8', '9', '10', '11', '12 '],
      required: [true, 'please provide class'],
    },
  },
  { timestamps: true }
)

const Course = mongoose.model('Course', CourseSchema)

export default Course
