import asynchandler from 'express-async-handler'
import Course from '../models/course-model.js'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../errors/index.js'

const getAllSubject = asynchandler(async(req, res)=> {
  res.send('Get all subject')
})

const getAllChapters = asynchandler(async(req, res)=> {
  res.send('Get all chapters')
})
const getAllvideos = asynchandler(async(req, res)=> {
  res.send('Get all chapters')
})
const getSingleVideo = asynchandler(async (req, res) => {
  res.send('Get all chapters')
})


export {getAllChapters ,getAllSubject,getAllvideos,getSingleVideo}
