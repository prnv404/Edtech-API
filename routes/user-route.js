import express from 'express'
const router = express.Router()

import {
  authenticateUser,
  authorizePermission,
} from '../middleware/authenticate.js'
import { updateUser, getUser } from '../controllers/user-controller.js'

router.route('/').get(authenticateUser, getUser)
router.route('/').patch(authenticateUser, updateUser)

export default router
