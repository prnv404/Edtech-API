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

router
   .route('/subjects')
   .get(authenticateUser, getSubject)
   .post(authenticateUser, authorizePermission('admin'), createSubject)
router
   .route('/chapters')
   .get(authenticateUser, getChapters)
   .post(authenticateUser, authorizePermission('admin'), createChapters)

module.exports = router
