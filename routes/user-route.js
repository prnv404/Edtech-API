import express from 'express'
const router = express.Router()

import {
  authenticateUser,
  authorizePermission,
} from '../middleware/authenticate.js'
import {
  getAllUser,
  getSingleUser,
  changeStandred,
} from '../controllers/user-controller.js'

router
  .route('/')
  .get(authenticateUser, authorizePermission('admin'), getAllUser)
router.route('/:id').get(authenticateUser, getSingleUser)
router.route('/update').patch(authenticateUser, changeStandred)

export default router
