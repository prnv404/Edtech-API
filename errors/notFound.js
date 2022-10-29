const  CustomApiError = require('./custom-api.js') 
const { StatusCodes } =  require( 'http-status-codes')

class NotFoundError extends CustomApiError {
  constructor(message) {
    super(message)
    this.StatusCode = StatusCodes.NOT_FOUND
  }
}

module.exports=  NotFoundError
