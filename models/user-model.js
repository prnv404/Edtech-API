import mongoose from 'mongoose'
import validator from 'validator'

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide a name'],
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: validator.isMobilePhone,
    },
    maxlength: 10,
    minlength: 10,
    required: [true, 'please provide a phoneNumber'],
    unique: true,
  },
  standerd: {
    type: String,
    enum: ['9', '10', '11', '12'],
    required: [true, 'please provide your standerd'],
  },
  password: {
    type: String,
    trim: true,
    minlength: 5,
    required: [true, 'please provide a password'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
  },
})




const User = mongoose.model('User', UserSchema)

export default User
