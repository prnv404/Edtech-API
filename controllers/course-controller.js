/* eslint-disable prettier/prettier */
import asynchandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'
import Course from '../models/course-model.js'
import CustomError from '../errors/index.js'

const getSubjects = asynchandler(async (req, res) => {
   const { standerd } = req.user
   if (!standerd) {
      throw new CustomError.BadRequestError('Please provide standred')
   }
   const subject = await Course.find({ standerd }).select('subject')
   //  console.log(subject)

   res.status(StatusCodes.OK).json(subject)
})

const getchapters = asynchandler(async (req, res) => {
   const sub = req.query.subject
   const chapters = await Course.find({ subject: sub }).select(
      'chapterNo chapterName'
   )

   res.status(StatusCodes.OK).json(chapters)
})

const getAllVideo = asynchandler(async (req, res) => {
   const videoId = req.params.id

   const video = await Course.findOne({
      _id: videoId,
   })
   res.status(StatusCodes.OK).json(video)
})

const getSingleVideo = asynchandler(async (req, res) => {
   //  const { chapterNo, subject } = req.query
   const videoId = req.params.id
   //  console.log(videoId)
   const video = await Course.findOne({
      _id: videoId,
   })

   res.status(StatusCodes.OK).json(video)
})

const createCourse = asynchandler(async (req, res) => {
   const course = await Course.create(req.body)
   res.send(course)
})

const vidoeUpload = asynchandler(async (req, res, next) => {
   //  console.log('video upload')
   next()
})

export {
   getchapters,
   getAllVideo,
   createCourse,
   getSingleVideo,
   getSubjects,
   vidoeUpload,
}
