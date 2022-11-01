/* eslint-disable import/extensions */
const BadRequestError = require('./badRequest')
const UnAuthorized = require('./unAuthorized')
const UnAutenticated = require('./UnAuthenticated')
const NotFound = require('./notFound.js')
const CustomApiError = require('./custom-api')

module.exports = {
    BadRequestError,
    UnAuthorized,
    UnAutenticated,
    NotFound,
    CustomApiError,
}
