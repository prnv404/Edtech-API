const asynchandler = require('express-async-handler');
const User = require('../models/user-model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookieToResponse, createTokenUser } = require('../utils');

const getUser = asynchandler(async (req, res) => {
   const userId = req.user.userId;
   const user = await User.findOne({ _id: userId }).select('-password');
   res.status(StatusCodes.OK).json(user);
});

const updateUser = asynchandler(async (req, res) => {
   const { changeStandred } = req.body;

   if (!changeStandred) {
      throw new CustomError.BadRequestError('Please provide standred');
   }
   const user = await User.findOne({ _id: req.user.userId });
   user.standerd = changeStandred;
   await user.save();

   const tokenUser = createTokenUser(user);
   attachCookieToResponse({ res, user: tokenUser });

   res.status(StatusCodes.CREATED).json({ tokenUser });
});

module.exports = { updateUser, getUser };
