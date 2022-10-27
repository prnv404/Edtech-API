const express = require('express')
const router = express.Router()

const {
   authenticateUser,
   authorizePermission,
} = require('../middleware/authenticate')
// const busboy = require('../middleware/busboy')
const uploadVideo = require('../middleware/upload')

const {
   getAllVideos,
   getSingleVideo,
   createVideo
} = require('../controllers/video-controller')

router.route('/').get(authenticateUser, getAllVideos)
router.route('/:id').get(authenticateUser, getSingleVideo)
router
   .route('/upload')
   .post(authenticateUser, authorizePermission('admin'),uploadVideo,createVideo)

module.exports = router
