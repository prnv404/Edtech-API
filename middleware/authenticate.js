import CustomError from '../errors/index.js'
import AsyncHandler from 'express-async-handler'
import { isTokenValid } from '../utils/jwt.js'

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token
  if (!token) {
    throw new CustomError.unAutenticated('please signup or login')
  }
  try {
    const payload = isTokenValid({ token })
    req.user = payload
    console.log(req.user)
    next()
  } catch (error) {
    console.log(error)
    throw new CustomError.unAutenticated('Token error')
  }
}

const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.student)) {
      throw new CustomError.unAutenticated(
        'You have no permission to access to this route'
      )
    }
    next()
  }
}

export { authenticateUser, authorizePermission }
