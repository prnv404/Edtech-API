import express from 'express'

import {
   getchapters,
   getAllVideo,
   getSingleVideo,
   createCourse,
   getSubjects,
   vidoeUpload,
} from '../controllers/course-controller.js'
import {
   authenticateUser,
   authorizePermission,
} from '../middleware/authenticate.js'

const router = express.Router()

router.route('/subject').get(authenticateUser, getSubjects)
router
   .route('/create')
   .post(
      authenticateUser,
      authorizePermission('admin'),
      vidoeUpload,
      createCourse
   )


router.route('/chapters').get(authenticateUser, getchapters)
router.route('/section').get(authenticateUser, getAllVideo)
router.route('/video/:id').get(authenticateUser, getSingleVideo)

export default router
