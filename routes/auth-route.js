const express = require('express');
const router = express.Router();

const {
   signup,
   login,
   logout,
   check,
} = require('../controllers/auth-controller');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/check').get(check);
// router.route('/resend').get(resendOTP);

module.exports = router;
