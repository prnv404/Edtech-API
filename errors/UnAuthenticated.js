const { StatusCodes } = require('http-status-codes')
const CustomApiError = require('./custom-api')

class UnAuthenticatedError extends CustomApiError {
    constructor(message) {
        super(message)
        this.StatusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnAuthenticatedError
