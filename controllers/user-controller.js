const User = require('../models/user-model');
const CustomError = require('../errors');
const { createTokenUser, attachCookieToResponse } = require('../utils');
const { StatusCodes } = require('http-status-codes');

/**
 * It updates the user's standred
 * @param req - The request object.
 * @param res - The response object.
 */
const updateUser = async (req, res) => {
   const { userId } = req.user;

   const { standred } = req.body;

   if (!standred) {
      throw new CustomError.BadRequestError('please provide standred');
   }

   const user = await User.findOne({ _id: userId }).select('-password');

   if (!user) {
      throw new CustomError.NotFound('No user found');
   }

   user.standred = standred;

   await user.save();

   const tokenUser = createTokenUser(user);
   attachCookieToResponse({ res, user: tokenUser });

   res.status(StatusCodes.OK).json({ user });
};

/**
 * It takes the old password and the new password from the request body, finds the user in the
 * database, compares the old password with the one in the database, and if they match, updates the
 * password in the database
 * @param req - The request object.
 * @param res - The response object.
 */

const updatePassword = async (req, res) => {
   const { oldPassword, newPassword } = req.body;
   const { userId } = req.user;
   if (!oldPassword || !newPassword) {
      throw new CustomError.BadRequestError('please provide all values');
   }

   const user = await User.findOne({ _id: userId });

   if (!user) {
      throw new CustomError.BadRequestError('No user found');
   }

   const isMatch = user.comparePassword(oldPassword);
   if (!isMatch) {
      throw new CustomError.BadRequestError('incorrect password');
   }

   user.password = newPassword;
   await user.save();

   res.status(StatusCodes.ACCEPTED).json({
      message: 'password updated succesfully',
   });
   
};

/**
 * It gets the userId from the request object, finds the user in the database, and returns the user
 * @param req - The request object.
 * @param res - The response object.
 */
const getUser = async (req, res) => {
   const { userId } = req.user;
   const user = await User.findOne({ _id: userId }).select('-password');
   if (!user) {
      throw new CustomError.NotFound('No user found');
   }
   res.status(StatusCodes.OK).json({ user });
};

module.exports = {
   updateUser,
   getUser,
   updatePassword,
};
