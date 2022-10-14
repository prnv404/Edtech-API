const asynchandler = require('express-async-handler');
const Course = require('../models/course-model');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Subject = require('../models/subject-model');

const getSubjects = asynchandler(async (req, res) => {
  const standerd = req.user.standerd;
  console.log(standerd);
  const subject = await Subject.find({ class: standerd });

  res.status(StatusCodes.OK).json(subject);
});

const createSubjects = asynchandler(async (req, res) => {
  const subjects = await Subject.create(req.body);
  res.status(StatusCodes.OK).json(subjects);
});

module.exports = { getSubjects, createSubjects };
