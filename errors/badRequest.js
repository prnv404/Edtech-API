const CustomApiError = require('../errors/custom-api')
const { StatusCodes } = require('http-status-codes')

class BadRequestError extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError
