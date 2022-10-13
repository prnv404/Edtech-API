import express from 'express'
const router = express.Router()

import {
  getAllSubject,
  getAllChapters,
  getAllvideos,
  getSingleVideo,
} from '../controllers/course-controller.js'
import {
  authenticateUser,
  authorizePermission,
} from '../middleware/authenticate.js'

router
  .route('/')
  .get(authenticateUser, authorizePermission('admin'), getAllSubject)
router
  .route('/subjects')
  .get(authenticateUser, authorizePermission('admin'), getAllSubject)
router
  .route('/chapters')
  .get(authenticateUser, authorizePermission('admin'), getAllChapters)

router.route('/allvideos').get(authenticateUser, getAllvideos)
router.route('/:id').get(authenticateUser, getSingleVideo)

export default router

