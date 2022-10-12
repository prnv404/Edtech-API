import asynchandler from 'express-async-handler'
import User from '../models/user-model.js'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'

const getAllUser = asynchandler(async (req, res) => {
  const users = await User.find({})
  res.status(StatusCodes.OK).json({ count: users.length, users })
})

const getSingleUser = asynchandler(async (req, res) => {
  const userId = req.params.id
  const user = await User.findOne({ _id: userId })
  if (!user) {
    throw new CustomError.NotFound('No user found')
  }
  res.status(StatusCodes.OK).json({ user })
})

const updateUser = asynchandler(async (req, res) => {})

export { getAllUser, getSingleUser, updateUser }
