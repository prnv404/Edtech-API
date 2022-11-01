const express = require('express')

const router = express.Router()

const {
    authenticateUser,
    authorizePermission,
} = require('../middleware/authenticate')

const { createCourse } = require('../controllers/course-controller')

router
    .route('/')
    .post(authenticateUser, authorizePermission('admin'), createCourse)

module.exports = router
