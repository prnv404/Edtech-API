const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const User = require('../models/user-model');
const { attachCookieToResponse, createTokenUser } = require('../utils');
const { createOTP, verifyOTP } = require('../utils/create-otp');

const signup = asyncHandler(async (req, res) => {
    const { name, phoneNumber, password, standerd } = req.body;

    if (!name || !phoneNumber || !password || !standerd) {
        throw new CustomError.BadRequestError('please provide all values');
    }
    const isFirstAccount = (await User.countDocuments({})) === 0;

    const role = isFirstAccount ? 'admin' : 'user';
    const user = await User.create({
        name,
        phoneNumber,
        password,
        standerd,
        role,
    });
    createOTP({ res, phonenumber: phoneNumber, channel: 'sms' })
    const tokenUser = createTokenUser(user);
    attachCookieToResponse({ res, user: tokenUser });

    res.status(StatusCodes.CREATED).json({ tokenUser });
});

const login = asyncHandler(async (req, res) => {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
        throw new CustomError.BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ phoneNumber });
    if (!user) {
        throw new CustomError.NotFound(
            `No user found with this ${phoneNumber}`
        );
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new CustomError.UnAuthorized('Incorrect Password');
    }

    createOTP({ res, phonenumber: phoneNumber, channel: 'sms' });
    // const tokenUser = createTokenUser(user);
    // attachCookieToResponse({ res, user: tokenUser });

    res.status(StatusCodes.OK);
});

/**
 * It checks if the OTP is valid, if it is, it creates a verified document, creates a tokenUser,
 * attaches the tokenUser to the response and returns the tokenUser
 * @param req - The request object.
 * @param res - The response object
 */
const check = async (req, res) => {
   const { phone, OTP } = req.query;
  
   const isVerified = await verifyOTP({ phoneNumber: phone, code: OTP });
   // const { valid } = isVerified;
   if (isVerified.valid === false) {
      throw new CustomError.BadRequestError('Incorrect OTP');
   }
   const user = await User.findOne({ phoneNumber: phone });
   const verified = await Verify.create({ verified: true, userId: user._id });
   const tokenUser = createTokenUser(user, verified);
   attachCookieToResponse({ res, user: tokenUser, verified });
   res.status(StatusCodes.OK).json({ tokenUser });
};
/**
 * It sets the cookie token to logout and sets the expiration date to the current date
 * @param req - The request object.
 * @param res - The response object.
 */

const logout = asyncHandler(async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });

    res.status(StatusCodes.OK).json({ message: 'Logout successfully' });
});

module.exports = { signup, login, logout, otp };
