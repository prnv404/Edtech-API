const express = require('express');
const router = express.Router();

const {
   authenticateUser,
   authorizePermission,
} = require('../middleware/authenticate');
const uplaodVideoApi = require('../middleware/upload-video');
const {
   getSubject,
   getChapters,
   getAllVideos,
   getSingleVideo,
   createChapters,
   createSubject,
   uploadVideo,
} = require('../controllers/course-controller');

router
   .route('/subjects')
   .get(authenticateUser, getSubject)
   .post(authenticateUser, authorizePermission('admin'), createSubject);
router
   .route('/chapters')
   .get(authenticateUser, getChapters)
   .post(authenticateUser, authorizePermission('admin'), createChapters);
router.route('/videos').get(authenticateUser, getAllVideos);
router.route('/videos/:id').get(authenticateUser, getSingleVideo);

router.route('/uploadvideo').post(
   authenticateUser,
   authorizePermission('admin'),
   // uplaodVideoApi,
   uploadVideo
);

module.exports = router;
