import AsyncHandler from 'express-async-handler'
import CustomError from '../errors/index.js'
import { isTokenValid } from '../utils/jwt.js'

const authenticateUser = async (req, res, next) => {
   const { token } = req.signedCookies
   if (!token) {
      throw new CustomError.UnAutenticated('please signup or login')
   }
   try {
      const payload = isTokenValid({ token })
      req.user = payload
      next()
   } catch (error) {
      throw new CustomError.UnAutenticated('Token error')
   }
}

const authorizePermission =
   (...roles) =>
   (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         throw new CustomError.UnAutenticated('You have no permission to access to this route')
      }
      next()
   }

export { authenticateUser, authorizePermission }
