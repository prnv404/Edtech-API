const { StatusCodes } = require('http-status-codes')

const errorhandlerMiddleware = (err, req, res, next) => {
    //  console.log(err)
    let customError = {
        StatusCode: err.StatusCode
            ? err.StatusCode
            : StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message
            ? err.message
            : 'Something went Wrong Please try again',
    }

    if (err._message === 'User validation failed') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
        customError.StatusCode = 400
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} please provide another value`
        customError.StatusCode = 400
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`
        customError.StatusCode = 404
    }

    return res.status(customError.StatusCode).json({ message: customError.msg })
}

module.exports = errorhandlerMiddleware
