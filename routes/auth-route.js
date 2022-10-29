const express = require('express')
const router = express.Router()

const {
    signup,
    login,
    verifyNumber,
    logout,
    resend,
} = require('../controllers/auth-controller')

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/verify').post(verifyNumber)
router.route('/resend').get(resend)

module.exports = router
