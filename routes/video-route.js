const express = require('express')
const router = express.Router()

const {
   authenticateUser,
   authorizePermission,
} = require('../middleware/authenticate')

const {
   getAllVideos,
   getSingleVideo,
   uploadVideo
   
} = require('../controllers/video-controller')

router.route('/').get(authenticateUser, getAllVideos)
router
   .route('/:id')
   .get(authenticateUser, getSingleVideo)
router
   .route('/upload')
   .post(authenticateUser, authorizePermission('admin'),uploadVideo)

module.exports = router
