import express from 'express'
const router = express.Router()

import {
  getSubjects,
  createSubjects,
} from '../controllers/subject-controller.js'
import {
  authenticateUser,
  authorizePermission,
} from '../middleware/authenticate.js'

router
  .route('/')
  .get(authenticateUser, getSubjects)
  .post(authenticateUser, authorizePermission('admin'), createSubjects)

export default router
