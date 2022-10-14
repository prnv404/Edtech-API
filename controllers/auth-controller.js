import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'
import User from '../models/user-model.js'
import { attachCookieToResponse, createTokenUser } from '../utils/index.js'

const signup = asyncHandler(async (req, res) => {
    const { name, phoneNumber, password, standerd } = req.body

    if (!name || !phoneNumber || !password || !standerd) {
        throw new CustomError.BadRequestError('please provide all values')
    }
    const isFirstAccount = (await User.countDocuments({})) === 0

    const role = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({
        name,
        phoneNumber,
        password,
        standerd,
        role,
    })

    const tokenUser = createTokenUser(user)
    attachCookieToResponse({ res, user: tokenUser })

    res.status(StatusCodes.CREATED).json({ tokenUser })
})

const login = asyncHandler(async (req, res) => {
    const { phoneNumber, password } = req.body

    if (!phoneNumber || !password) {
        throw new CustomError.BadRequestError('Please provide all values')
    }

    const user = await User.findOne({ phoneNumber })

    if (!user) {
        throw new CustomError.NotFound(`No user found with this ${phoneNumber}`)
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        throw new CustomError.UnAuthorized('Incorrect Password')
    }

    const tokenUser = createTokenUser(user)
    attachCookieToResponse({ res, user: tokenUser })

    res.status(StatusCodes.OK).json({ tokenUser })
})

const otp = asyncHandler(async (req, res) => {
    const { code } = req.body
    console.log(code)
    res.send('Hello OTP')
})

/* This is a function that is used to logout the user. */

const logout = asyncHandler(async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })

    res.status(StatusCodes.OK).json({ message: 'Logout successfully' })
})

export { signup, login, logout, otp }
