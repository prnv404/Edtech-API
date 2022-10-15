const  CustomError = require( '../errors/index.js')
const  { isTokenValid } = require( '../utils/jwt.js')

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token
  if (!token) {
    throw new CustomError.unAutenticated('please signup or login')
  }
  try {
    const payload = isTokenValid({ token })
    req.user = payload
    next()
  } catch (error) {
    console.log(error)
    throw new CustomError.unAutenticated('Token error')
  }
}

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

module.exports= { authenticateUser, authorizePermission }
