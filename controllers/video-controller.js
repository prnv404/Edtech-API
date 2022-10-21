const Video = require('../models/video-model')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')


let Vimeo = require('vimeo').Vimeo
let client = new Vimeo(
   process.env.CLIENT_IDENTIFIER,
   process.env.CLIENT_SECRET,
   process.env.PERSONAL_ACCESS_TOKEN
)


/**
 * It takes a video id from the request params, makes a request to the Vimeo API, and returns the video
 * data in the response
 * @param req - The request object.
 * @param res - The response object that will be sent back to the client.
 */

const getSingleVideo = async (req, res) => {
   
   const videoId = req.params.id
   client.request(
      {
         method: 'GET',
         path: `/videos/${videoId}`,
      },
      function (error, body, status_code, headers) {
         if (error) {
            console.log(error)
         }
         const data = {
            name: body.name,
            url: body.uri,
            duration: body.duration,
            description: body.description,
         }
         res.status(StatusCodes.OK).json({ data })
      }
   )
}

/**
 * It gets all the videos of a particular chapter
 * @param req - The request object.
 * @param res - The response object.
 */

const getAllVideos = async (req, res) => {
   const { chapter } = req.query
   if (!chapter) {
      throw new CustomError.BadRequestError('Please provide chapter')
   }
   const videos = await Video.find({ chapter }).select(
      'title positionOfVideo videoPath discription'
   )
   res.status(StatusCodes.OK).json({ videos })
}

/**
 * It creates a video and returns the video in the response
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */

const createVideo = async (req, res) => {
   const video = await Video.create(req.body)
   res.status(StatusCodes.CREATED).json({ video })
}

module.exports = {
   getAllVideos,
   getSingleVideo,
   createVideo,
}
