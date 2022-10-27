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

/**
 * It gets all the videos of a particular chapter
 * @param req - The request object.
 * @param res - The response object.
 */

const getAllVideos = async (req, res) => { 

}

const getSingleVideo = async (req, res) => {
   client.request({
     method: 'GET',
     path: `/videos/${req.params.id}`
   }, function (error, body, status_code, headers) {
     if (error) {
       console.log(error);
     }
 
     console.log(body);
   })
}

/**
 * It creates a video and returns the video in the response
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const createVideo = async (req, res) => {
   req.send('hello')
}


const uploadVideo = async (req, res) => {
   res.send('hello')
}

module.exports = {
   getAllVideos,
   getSingleVideo,
   createVideo,
   uploadVideo
}
