import express from 'express'
const router = express.Router()

import {
  authenticateUser,
  authorizePermission,
} from '../middleware/authenticate.js'
import {
  getAllUser,
  getSingleUser,
  updateUser,
} from '../controllers/user-controller.js'

router
  .route('/')
  .get(authenticateUser, authorizePermission('admin'), getAllUser)
router.route('/:id').get(authenticateUser, getSingleUser)
router.route('/:id').post(authenticateUser, updateUser)

export default router
