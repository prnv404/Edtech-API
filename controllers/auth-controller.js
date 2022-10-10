import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'

const signup = asyncHandler(async (req, res) => {
  const {name,phoneNo, password } = req.body

  if (!name||!phoneNo || !password) {
    throw new CustomError.BadRequestError('please provide all data')
  }
  
  res.send('hello')
})
const login = asyncHandler(async (req, res) => {
  res.send('login')
})
const logout = asyncHandler(async (req, res) => {
  res.send('logout')
})

export { signup, login, logout }
