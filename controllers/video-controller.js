const Video = require('../models/video-model')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')

const Chapter = require('../models/chapter-model')

let Vimeo = require('vimeo').Vimeo
let client = new Vimeo(
   process.env.CLIENT_IDENTIFIER,
   process.env.CLIENT_SECRET,
   process.env.PERSONAL_ACCESS_TOKEN
)

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
         console.log(body)
         res.status(StatusCodes.OK).json({ data })
      }
   )
}

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

const createVideo = async (req, res) => {
   const video = await Video.create(req.body)
   res.status(StatusCodes.CREATED).json({ video })
}

module.exports = {
   getAllVideos,
   getSingleVideo,
   createVideo,
}
