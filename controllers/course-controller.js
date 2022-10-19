const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const Course = require('../models/course-model')

const createCourse = async (req, res) => {
   const { standred, price } = req.body
   if (!standred || !price) {
      throw new CustomError.BadRequestError('Please provide all values')
   }
   const course = await Course.create({ standred, price })
   res.status(StatusCodes.CREATED).json(course)
}

const getAllCourse = async (req, res) => {
   const course = await Course.find({})
   res.status(StatusCodes.CREATED).json(course)
}

module.exports = { createCourse, getAllCourse }
