import asynchandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'
import User from '../models/user-model.js'
import CustomError from '../errors/index.js'
import { attachCookieToResponse, createTokenUser } from '../utils/index.js'

const getUser = asynchandler(async (req, res) => {
   const { userId } = req.user
   const user = await User.findOne({ _id: userId }).select('-password')
   res.status(StatusCodes.OK).json(user)
})

const updateUser = asynchandler(async (req, res) => {
   const changeStd = req.body.standerd
   const user = await User.findOne({ _id: req.user.userId })
   user.standerd = changeStd
   await user.save()

   const tokenUser = createTokenUser(user)
   attachCookieToResponse({ res, user: tokenUser })

   res.status(StatusCodes.CREATED).json({ tokenUser })
})

export { updateUser, getUser }
