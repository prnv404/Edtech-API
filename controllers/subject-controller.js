import asynchandler from 'express-async-handler'
import Course from '../models/course-model.js'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'
import Subject from '../models/subject-model.js'

const getSubjects = asynchandler(async (req, res) => {
  const standerd = req.user.standerd
  console.log(standerd)
  const subject = await Subject.find({ class: standerd })
 
  res.status(StatusCodes.OK).json(subject)
})

const createSubjects = asynchandler(async (req, res) => {
  const subjects = await Subject.create(req.body)
  res.status(StatusCodes.OK).json(subjects)
})

export { getSubjects, createSubjects }
