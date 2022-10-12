import { StatusCodes } from 'http-status-codes'

const errorhandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong please try again',
  }
  if (err.name === 'validationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.statusCode = 400
  }
  if (err.code && err.code === 1100) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} please provide another value`
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({ message: customError.msg })
}

export default errorhandlerMiddleware
