import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'
import User from '../models/user-model.js'
import { attachCookieToResponse, createTokenUser } from '../utils/index.js'
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

const login = asyncHandler(async (req, res) => {
  res.send('login')
})

const logout = asyncHandler(async (req, res) => {
  res.send('logout')
})

export { signup, login, logout }
