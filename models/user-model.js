const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please provide a name'],
            trim: true,
            minlength: 3,
            maxlength: 30,
        },
        mobNumber: {
            type: String,
            validate: {
                validator: validator.isMobilePhone,
            },
            maxlength: 10,
            minlength: 10,
            required: [true, 'please provide a phoneNumber'],
            unique: true,
        },
        standred: {
            type: String,
            enum: ['8', '9', '10', '11', '12'],
            required: [true, 'please provide your standerd'],
        },
        password: {
            type: String,
            trim: true,
            minlength: 5,
            required: [true, 'please provide a password'],
        },
        isVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            required: true,
        },
    },
    { timestamps: true }
)

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    const genSalt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, genSalt)
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)
