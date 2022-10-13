import asynchandler from 'express-async-handler'
import User from '../models/user-model.js'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'
import { attachCookieToResponse, createTokenUser } from '../utils/index.js'

const getUser = asynchandler(async (req, res) => {
  const userId = req.user.userId
  const user = await User.findOne({ _id: userId }).select('-password')
  res.status(StatusCodes.OK).json(user)
})

const updateUser = asynchandler(async (req, res) => {
  const { standred, subscription } = req.body

  const user = await User.findOne({ _id: req.user.userId })

  user.standred = standred || user.standred
  user.subscription = subscription || user.subscription

  const tokenUser = createTokenUser(user)
  attachCookieToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json(tokenUser)
})

export { updateUser, getUser }
