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
const {
   getSubject,
   getChapters,
   createChapters,
   createSubject,
} = require('../controllers/course-controller')

router
   .route('/subjects')
   .get(authenticateUser, getSubject)
   .post(authenticateUser, authorizePermission('admin'), createSubject)
router
   .route('/chapters')
   .get(authenticateUser, getChapters)
   .post(authenticateUser, authorizePermission('admin'), createChapters)
router.route('/video').get(authenticateUser, getAllVideos)
router.route('/video/:id').get(authenticateUser, getSingleVideo)
router
   .route('/createVideo')
   .post(authenticateUser, authorizePermission('admin'), createVideo)
module.exports = router
