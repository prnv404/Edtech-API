const CustomError = require('../errors');
const Subject = require('../models/subject-model');
const Chapter = require('../models/chapter-model');
const Video = require('../models/video-model');
const { StatusCodes } = require('http-status-codes');

/*
TODO:
 
 [] video uplaod controller
 [] video upload middleware
 [] set flag for single video
 
*/

/**
 * It creates a subject and returns it
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */

const createSubject = async (req, res) => {
   const subject = await Subject.create(req.body);
   res.status(StatusCodes.CREATED).json({ subject });
};

/**
 * It fetches the subjects of the standred of the user
 * @param req - The request object.
 * @param res - The response object.
 */

const getSubject = async (req, res) => {
   const { standred } = req.user;

   const subjects = await Subject.find({ standred }).select('subject');
   res.status(StatusCodes.OK).json({ subjects });
};

/**
 * It creates a new chapter in the database
 * @param req - The request object.
 * @param res - The response object.
 */

const createChapters = async (req, res) => {
   const chapters = await Chapter.create(req.body);

   res.status(StatusCodes.OK).json({ chapters });
};

/**
 * It fetches all the chapters of a particular subject
 * @param req - The request object.
 * @param res - The response object.
 */

const getChapters = async (req, res) => {
   const { subject } = req.query;

   if (!subject) {
      throw new CustomError.BadRequestError('No subject');
   }

   const chapters = await Chapter.find({ subject });

   res.status(StatusCodes.OK).json({ chapters });
};

/**
 * It fetches all the videos of a particular chapter
 * @param req - The request object.
 * @param res - The response object.
 */

const getAllVideos = async (req, res) => {
   const { chapter } = req.query;

   if (!chapter) {
      throw new CustomError.BadRequestError('Please provide chapter');
   }

   const videos = await Video.find({ chapter })
      .select('title chapterNo positionOfVideo')
      .sort('positionOfVideo');

   res.status(StatusCodes.OK).json({ videos });
};

/**
 * It gets a single video from the database
 * @param req - The request object.
 * @param res - The response object.
 */

const getSingleVideo = async (req, res) => {
   const  videoId  = req.params.id;

   if (!videoId) {
      throw new CustomError.BadRequestError('No video Id');
   }

   const video = await Video.findOne({ _id: videoId });

   if (!video) {
      throw new CustomError.NotFound('No video found');
   }

   res.status(StatusCodes.OK).json({ video });
};

/**
 * It creates a video and returns it
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */

const createVideo = async (req, res) => {
   const video = await Video.create(req.body);

   res.status(StatusCodes.CREATED).json({ video });
};

module.exports = {
   getSubject,
   getChapters,
   getAllVideos,
   getSingleVideo,
   createVideo,
   createSubject,
   createChapters,
};
