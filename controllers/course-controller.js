import asynchandler from 'express-async-handler'
import Course from '../models/course-model.js'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'

const getchapters = asynchandler(async (req, res) => {
  const subject = req.query.subject

  const chapters = Course.find({ subject: subject, class: req.user.class })

  res.status(StatusCodes.OK).json(chapters)
})

const getVideo = asynchandler(async (req, res) => {
  const { chapterNo, subject } = req.query
  const videoId = req.params.id

  const video = Course.findOne({
    _id: videoId,
    chapterNo: chapterNo,
    subject: subject,
    class: req.user.class,
  })
  
  res.status(StatusCodes.OK).json(video)
})

export { getchapters, getVideo }
