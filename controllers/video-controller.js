const Video = require('../models/video-model')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')

// let Vimeo = require('vimeo').Vimeo
// let client = new Vimeo(
//    process.env.CLIENT_IDENTIFIER,
//    process.env.CLIENT_SECRET,
//    process.env.PERSONAL_ACCESS_TOKEN
// )

/**
 * It takes a video id from the request params, makes a request to the Vimeo API, and returns the video
 * data in the response
 * @param req - The request object.
 * @param res - The response object that will be sent back to the client.
 */

const getSingleVideo = async (req, res) => {
   
   // console.log(req.video.Body)
   console.log(JSON.stringify(req.video.Body))
   // console.log(req.video.VersionId)
   res.send('hello')
}

/**
 * It gets all the videos of a particular chapter
 * @param req - The request object.
 * @param res - The response object.
 */

const getAllVideos = async (req, res) => {}

/**
 * It creates a video and returns the video in the response
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */

const createVideo = async (req, res) => {
   // console.log(req.aws)
   res.send('hello')
}

module.exports = {
   getAllVideos,
   getSingleVideo,
   createVideo,
}
