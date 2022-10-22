const express = require('express')
const router = express.Router()

const {
   authenticateUser,
   authorizePermission,
} = require('../middleware/authenticate')

const {
   getAllVideos,
   getSingleVideo,
   createVideo,
} = require('../controllers/video-controller')

const { upload, getItBack } = require('../utils/upload')

router.route('/').get(authenticateUser, getAllVideos)
router
   .route('/:id')
   .get(
      authenticateUser,
      authorizePermission('admin'),
      getItBack,
      getSingleVideo
   )
router
   .route('/upload')
   .post(authenticateUser, authorizePermission('admin'), upload, createVideo)

module.exports = router
