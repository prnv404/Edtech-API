const express = require('express')
const router = express.Router()

const {
   authenticateUser,
   authorizePermission,
} = require('../middleware/authenticate')

const {
   createCourse,
   getAllCourse,
} = require('../controllers/course-controller')

router
   .route('/')
   .post(authenticateUser, authorizePermission('admin'), createCourse)
   .get(authenticateUser, getAllCourse)

module.exports = router
