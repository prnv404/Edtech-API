import asynchandler from 'express-async-handler'
import Course from '../models/course-model.js'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'

const getSubjects = asynchandler(async (req, res) => {
  const standerd = req.user.standerd
  const subject = await Course.find({ standerd: standerd }).select('subject')
  res.status(StatusCodes.OK).json(subject)
})

const getchapters = asynchandler(async (req, res) => {
  const sub = req.query.subject

  const chapters = await Course.find({ subject: sub })

  res.status(StatusCodes.OK).json(chapters)
})

const getAllVideo = asynchandler(async (req, res) => {
  const { chapterNo, subject } = req.query
  const videoId = req.params.id
  console.log(videoId)
  const video = await Course.findOne({
    _id: videoId,
  })

  res.status(StatusCodes.OK).json(video)
})
const getSingleVideo = asynchandler(async (req, res) => {
  const { chapterNo, subject } = req.query
  const videoId = req.params.id
  console.log(videoId)
  const video = await Course.findOne({
    _id: videoId,
  })

  res.status(StatusCodes.OK).json(video)
})

const createCourse = asynchandler(async (req, res) => {
  const course = await Course.create(req.body)
  res.send(course)
})

export { getchapters, getAllVideo, createCourse, getSingleVideo, getSubjects }
