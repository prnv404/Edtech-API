import express from 'express'
const router = express.Router()

import { signup, login, logout } from '../controllers/auth-controller.js'

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)

export default router
