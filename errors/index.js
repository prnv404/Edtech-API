const BadRequestError = require('./badRequest.js');
const UnAuthorized = require('./unAuthorized.js');
const unAutenticated = require('./UnAuthenticated.js');
const NotFound = require('./notFound.js');
const CustomApiError = require('./custom-api.js');

module.exports=  {
  BadRequestError,
  UnAuthorized,
  unAutenticated,
  NotFound,
  CustomApiError,
};
