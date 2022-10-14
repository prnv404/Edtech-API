const asyncHandler = require('express-async-handler');
const CustomError = require('../errors');
const User = require('../models/user-model');
const Verify = require('../models/verification-model');

const { StatusCodes } = require('http-status-codes');
const { attachCookieToResponse, createTokenUser } = require('../utils');
const { createOTP, verifyOTP } = require('../utils/create-otp');

const signup = async (req, res) => {
   const { name, phone, password, standred } = req.body;

   if (!name || !phone || !password || !standred) {
      throw new CustomError.BadRequestError('please provide all values');
   }
   const isFirstAccount = (await User.countDocuments({})) === 0;
   const role = isFirstAccount ? 'admin' : 'user';

   const user = await User.create({
      name: name,
      phoneNumber: phone,
      standred: standred,
      password: password,
      role: role,
   });
   await createOTP({ phoneNumber: phone, channel: 'sms' });
   res.status(StatusCodes.OK).json({ message: 'done' });
};

const login = async (req, res) => {
   const { password, phone } = req.body;

   if (!password || !phone) {
      throw new CustomError.BadRequestError('Please provide all values');
   }
   const user = await User.findOne({ phoneNumber: phone });
   if (!user) {
      throw new CustomError.NotFound('No user found');
   }
   if (!user.comparePassword(password)) {
      throw new CustomError.UnAuthorized('Password incorrect');
   }
   await createOTP({ phoneNumber: phone, channel: 'sms' });

   res.status(StatusCodes.OK).json({ message: 'done' });
};

const check = async (req, res) => {
   const { phone, OTP } = req.body;

   const isVerified = await verifyOTP({ phoneNumber: phone, code: OTP });
   
   if (isVerified.valid === false) {
      throw new CustomError.BadRequestError('Incorrect OTP');
   }
   const user = await User.findOne({ phoneNumber: phone });
   const verified = await Verify.create({ verified: true, userId: user._id });
   const tokenUser = createTokenUser(user, verified);
   attachCookieToResponse({ res, user: tokenUser, verified });
   res.status(StatusCodes.OK).json({ tokenUser });
};

const logout = async (req, res) => {
   res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
   });
   res.status(StatusCodes.OK).json({ msg: 'logout succesfully' });
};

module.exports = {
   signup,
   login,
   check,
   logout,
};
