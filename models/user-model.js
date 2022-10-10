import mongoose from 'mongoose'

const UserSchema = mongoose.model({
  name: {
    type: String,
    required: [true, 'please provide a name'],
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  standerd: {
    type: String,
    enum: ['9', '10', '11', '12'],
    required: true,
  },
})

export default mongoose.model('User', UserSchema)
