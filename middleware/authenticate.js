const CustomError = require('../errors/index.js')
const { isTokenValid } = require('../utils/jwt.js')

/**
 * It checks if the user is logged in and if the user is verified
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a function that you call when you want to pass control to the next middleware
 * function in the stack.
 */
const authenticateUser = async (req, res, next) => {
   const token = req.signedCookies.token
   if (!token) {
      throw new CustomError.unAutenticated('please signup or login')
   }
   try {
      const payload = isTokenValid({ token })
      const { isVerified } = payload
      if (isVerified === false) {
         throw new CustomError.unAutenticated('You are not verified')
      }
      req.user = payload
      next()
   } catch (error) {
      console.log(error)
      throw new CustomError.unAutenticated('Token error')
   }
}

/**
 * It takes in a list of roles, and returns a function that takes in a request, response, and next
 * function, and checks if the user's role is in the list of roles. If it is, it calls next(), which
 * passes control to the next middleware in the chain. If it isn't, it throws an error
 * @param roles - An array of roles that are allowed to access the route.
 * @returns A function that takes 3 arguments (req, res, next)
 */
const authorizePermission = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         throw new CustomError.unAutenticated(
            'You have no permission to access to this route'
         )
      }
      next()
   }
}

module.exports = { authenticateUser, authorizePermission }
