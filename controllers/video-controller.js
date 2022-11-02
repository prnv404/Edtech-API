const { StatusCodes } = require('http-status-codes')
const { Vimeo } = require('vimeo')
const Video = require('../models/video-model')
const CustomError = require('../errors')

const client = new Vimeo(
    process.env.CLIENT_IDENTIFIER,
    process.env.CLIENT_SECRET,
    process.env.PERSONAL_ACCESS_TOKEN
)

/*
TODO:
   1.GET ALL VIDEO CONTROLLER
   2.CREATE VIDEO CONTROLLER
*/

/**
 * It gets all the videos of a particular chapter
 * @param req - The request object.
 * @param res - The response object.
 */

const getAllVideos = async (req, res) => {
    const { standred } = req.user.standred

    const { subject, chapter } = req.query

    if (!subject || !chapter) {
        throw new CustomError.BadRequestError('Please provide all values')
    }

    const videos = await Video.find(standred, subject, chapter).sort(
        'positionOfVideo'
    )

    res.status(StatusCodes.OK).josn(videos)
}

const getSingleVideo = async (req, res) => {
    client.request(
        {
            method: 'GET',
            path: `/videos/${req.params.id}`,
        },
        (error, body, status_code, headers) => {
            // eslint-disable-next-line no-empty
            if (error) {
            }
            res.send('hello')
        }
    )
}

/**
 * It creates a video and returns the video in the response
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */

const uploadVideo = async (req, res) => {
    // eslint-disable-next-line camelcase
    const file_name = req.file.path

    client.upload(
        file_name,
        {
            name: `${req.file.originalname}`,
            description: 'nill',
        },
        (uri) => {
            res.status(StatusCodes.CREATED).json(uri)
        },
        (bytes_uploaded, bytes_total) => {
            const percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2)
            console.log(bytes_uploaded, bytes_total, `${percentage}%`)
        },
        (error) => {
            console.log(`Failed because: ${error}`)
        }
    )
}

/**
 * It creates a video and returns the video in the response
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */

const createVideo = async (req, res) => {
    const video = await Video.create(req.body)
    res.status(StatusCodes.CREATED).josn(video)
}

module.exports = {
    getAllVideos,
    getSingleVideo,
    uploadVideo,
    createVideo,
}
