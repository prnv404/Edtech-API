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

router.route('/').get(authenticateUser, getAllVideos)
router.route('/:id').get(authenticateUser,authorizePermission('admin'), getSingleVideo)
router
   .route('/createVideo')
   .post(authenticateUser, authorizePermission('admin'), createVideo)

module.exports = router
