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
  const changeStd = req.body.standerd;
  const user = await User.findOne({ _id: req.user.userId });
  user.standerd = changeStd;
  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookieToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ tokenUser });
});

module.exports = { updateUser, getUser };
