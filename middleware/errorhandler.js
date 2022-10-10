import { StatusCodes } from 'http-status-codes'

const errorhandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong please try again',
  }

  return res.status(customError.statusCode).json({ message: customError.msg })
}

export default errorhandlerMiddleware
