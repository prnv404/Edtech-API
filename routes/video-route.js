const express = require('express')
const router = express.Router()

const {
   authenticateUser,
   authorizePermission,
} = require('../middleware/authenticate')
const videoUpload = require('../middleware/multer')

const {
   getAllVideos,
   getSingleVideo,
   uploadVideo,
   createVideo,
} = require('../controllers/video-controller')

router.route('/').get(authenticateUser, getAllVideos)
router.route('/:id').get(authenticateUser, getSingleVideo)
router
   .route('/upload')
   .post(
      authenticateUser,
      authorizePermission('admin'),
      videoUpload.single('video'),
      uploadVideo
   )
router
   .route('/create')
   .post(authenticateUser, authorizePermission('admin'), createVideo)

module.exports = router
