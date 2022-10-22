const express = require('express')
const router = express.Router()

const {
   authenticateUser,
   authorizePermission,
} = require('../middleware/authenticate')

const {
   getAllVideos,
   getSingleVideo,
} = require('../controllers/video-controller')

const upload = require('../utils/upload')

router.route('/').get(authenticateUser, getAllVideos)
router
   .route('/:id')
   .get(authenticateUser, authorizePermission('admin'), getSingleVideo)
router
   .route('/upload')
   .post(authenticateUser, authorizePermission('admin'), upload)

module.exports = router
