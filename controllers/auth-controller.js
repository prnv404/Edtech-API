const { StatusCodes } = require('http-status-codes')
const User = require('../models/user-model')
const CustomError = require('../errors')
const { verifyOTP, createOTP } = require('../utils/OTP')
const { createTokenUser, attachCookieToResponse } = require('../utils')

/**
 * It creates a new user in the database
 * @param req - The request object.
 * @param res - The response object.
 * !more work required
 * TODO add new features
 */

const signup = async (req, res) => {
    const { name, password, mobNumber, standred } = req.body

    if (!name || !password || !mobNumber || !standred) {
        throw new CustomError.BadRequestError('Please provide all values')
    }

    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    await User.create({
        name,
        password,
        mobNumber,
        standred,
        role,
    })
    await createOTP({ phoneNumber: mobNumber, channel: 'sms' })

    res.status(StatusCodes.OK).json({ message: 'done' })
}

/**
 * It takes in a request and a response object, and returns a tokenUser object
 * @param req - The request object.
 * @param res - The response object.
 */

const login = async (req, res) => {
    const { password, mobNumber } = req.body

    if (!password || !mobNumber) {
        throw new CustomError.BadRequestError('Please provide all values')
    }

    const user = await User.findOne({ mobNumber })

    if (!user) {
        throw new CustomError.NotFound('No user found')
    }

    const isMatch = await user.comparePassword(password)

    if (isMatch === false) {
        throw new CustomError.BadRequestError('Incorrect password')
    }

    if (user.isVerified === false) {
        throw new CustomError.UnAuthorized('Please verify your account')
    }

    const tokenUser = createTokenUser(user)
    attachCookieToResponse({ res, user: tokenUser })

    res.status(StatusCodes.OK).json({ tokenUser })
}

/**
 * It verifies the OTP sent to the user's mobile number and then creates a JWT token for the user
 * @param req - The request object.
 * @param res - The response object.
 */

const verifyNumber = async (req, res) => {
    const { mobNumber, OTP } = req.body

    if (!mobNumber || !OTP) {
        throw new CustomError.BadRequestError('Please provide all values')
    }

    const user = await User.findOne({ mobNumber })

    if (!user) {
        throw new CustomError.NotFound('No user found')
    }

    const verify = await verifyOTP({ phoneNumber: mobNumber, code: OTP })

    const { valid } = verify

    if (!valid === true) {
        throw new CustomError.BadRequestError('Incorrect OTP')
    }

    user.isVerified = true

    await user.save()

    const tokenUser = createTokenUser(user)
    attachCookieToResponse({ res, user: tokenUser })

    res.status(StatusCodes.OK).json({ tokenUser })
}

/**
 * It takes a mobile number from the request body, creates an OTP for that number and sends it to the
 * user via SMS
 * @param req - The request object.
 * @param res - The response object.
 */

const resend = async (req, res) => {
    const { mobNumber } = req.body

    if (!mobNumber) {
        throw new CustomError.BadRequestError('Please provide mobile number')
    }

    await createOTP({ phoneNumber: mobNumber, channel: 'sms' })

    res.status(StatusCodes.OK).json({ message: 'OTP sended' })
}

/**
 * It sets the cookie to expire immediately, and then sends a response to the client
 * @param req - The request object.
 * @param res - The response object.
 */

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })

    res.status(StatusCodes.OK).josn({ message: 'ok' })
}

module.exports = {
    signup,
    login,
    verifyNumber,
    logout,
    resend,
}
