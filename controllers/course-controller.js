import asynchandler from 'express-async-handler'
import Course from '../models/course-model.js'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'

const createCourse = asynchandler(async (req, res) => {
  res.send('createCourse')
})
const updateCourser = asynchandler(async (req, res) => {
  res.send('updateCourser')
})
const deleteCourse = asynchandler(async (req, res) => {
  res.send('deleteCourse')
})

export { createCourse, updateCourser, deleteCourse }
