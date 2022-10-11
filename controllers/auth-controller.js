import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'
import User from '../models/user-model.js'
import { attachCookieToResponse, createTokenUser } from '../utils/index.js'


/* This is a function that is called when a user signs up. It takes in the request and response
objects. It then takes the name, phoneNumber, password, and standerd from the request body. It then
checks if the user is the first user to sign up. If they are, they are given the role of admin. If
not, they are given the role of user. It then creates a user with the given information. It then
creates a tokenUser with the user information. It then attaches the cookie to the response. It then
sends a response with the tokenUser. */

const signup = asyncHandler(async (req, res) => {
  const { name, phoneNumber, password, standerd } = req.body
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

/* This is a function that is called when a user logs in. It takes in the request and response
objects. It then takes the phoneNumber and password from the request body. It then checks if the
phoneNumber and password are provided. If they are not, it throws a bad request error. It then
finds the user with the given phoneNumber. If the user is not found, it throws a not found error. It
then creates a tokenUser with the user information. It then attaches the cookie to the response. It
then sends a response with the tokenUser. */

const login = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body
  if (!phoneNumber || !password) {
    throw new CustomError.BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ phoneNumber: phoneNumber })
  if (!user) {
    throw new CustomError.NotFound(`No user found with this ${phoneNumber}`)
  }
  const tokenUser = createTokenUser(user)
  attachCookieToResponse({ res, user: tokenUser })
  res.status(StatusCodes.OK).json({ tokenUser })
})

/* This is a function that is called when a user logs out. It takes in the request and response
objects. It then sets the cookie to logout. It then sends a response with a message. */

const logout = asyncHandler(async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ message: 'Logout successfully' })
})

export { signup, login, logout }
