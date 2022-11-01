const express = require('express')

const router = express.Router()

const {
    authenticateUser,
    authorizePermission,
} = require('../middleware/authenticate')

const {
    getSubject,
    getChapters,
    createChapters,
    createSubject,
} = require('../controllers/chapter-subject-controller')

const {
    getAllVideos,
    getSingleVideo,
    createVideo,
} = require('../controllers/video-controller')

router
    .route('/subjects')
    .get(authenticateUser, getSubject)
    .post(authenticateUser, authorizePermission('admin'), createSubject)
router
    .route('/chapters')
    .get(authenticateUser, getChapters)
    .post(authenticateUser, authorizePermission('admin'), createChapters)

router.route('/videos').get(authenticateUser, getAllVideos)
router.route('videos/:id').get(authenticateUser, getSingleVideo)
router
    .route('/createVideo')
    .post(authenticateUser, authorizePermission('admin'), createVideo)

module.exports = router
