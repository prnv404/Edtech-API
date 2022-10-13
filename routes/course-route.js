import express from 'express'
const router = express.Router()

import { getchapters, getVideo } from '../controllers/course-controller.js'
import {
  authenticateUser,
  authorizePermission,
} from '../middleware/authenticate.js'

router.route('/chapters').get(authenticateUser, getchapters)
router.route('/videos', authenticateUser, getVideo)
router.route('/video/:id', authenticateUser, authorizePermission(''))
export default router
