const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  logout,
  otp,
} = require('../controllers/auth-controller');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/otp').post(otp);

module.exports = router;
