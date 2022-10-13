import express from 'express'
const router = express.Router()

import {
  getchapters,
  getAllVideo,
  getSingleVideo,
  createCourse,
  getSubjects,
} from '../controllers/course-controller.js'
import {
  authenticateUser,
  authorizePermission,
} from '../middleware/authenticate.js'

router.route('/subject').get(authenticateUser, getSubjects)
router
  .route('/create')
  .post(authenticateUser, authorizePermission('admin'), createCourse)
router.route('/chapters').get(authenticateUser, getchapters)
router.route('/section').get(authenticateUser, getAllVideo)
router.route('/video/:id').get(authenticateUser, getSingleVideo)

export default router
