import express from 'express'
const router = express.Router()

import {
  createCourse,
  updateCourser,
  deleteCourse,
} from '../controllers/course-controller'
import {
  authenticateUser,
  authorizePermission,
} from '../middleware/authenticate.js'

router
  .route('/')
  .post(authenticateUser, authorizePermission('admin'), createCourse)
router
  .route('/:id')
  .patch(authenticateUser, authorizePermission('admin'), updateCourser)
router
  .route('/:id')
  .delete(authenticateUser, authorizePermission('admin'), deleteCourse)

export default router
