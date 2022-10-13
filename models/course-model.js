import mongoose from 'mongoose'
const CourseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'please provide a title'],
    },
    discription: {
      type: String,
      required: [true, 'please provide description '],
      maxlength: 200,
      minlength: 20,
    },
    video: {
      type: String,
      required: [true, 'please provide a video'],
    },
    subject: {
      type: String,
      enum: [
        'physics',
        'chemistry',
        'biology',
        'maths',
        'computer science',
        'social science',
        'biology',
        'malayalam',
        'english',
        'hindhi',
      ],
      required: [true, 'please provide subject'],
    },
    standerd: {
      type: String,
      enum: ['8', '9', '10', '11', '12 '],
      required: [true, 'please provide class'],
    },
    chapterNo: {
      type: Number,
      required: [true, 'please provide chappter no'],
    },
    chapterName: {
      type: String,
      required: [true, 'please provide chappter no'],
    },
    positionOfVideo: {
      type: Number,
      required: [true, 'please provide video position in chapters'],
    },
  },

  { timestamps: true }
)

const Course = mongoose.model('Course', CourseSchema)

export default Course
