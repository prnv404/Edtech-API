const  CustomApiError  =  require('./custom-api.js')
const  { StatusCodes }  =  require( 'http-status-codes')

class UnAuthenticatedError extends CustomApiError {
  constructor(message) {
    super(message)
    this.StatusCode = StatusCodes.UNAUTHORIZED
  }
}

module.exports=  UnAuthenticatedError
