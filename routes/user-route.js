const express = require('express');
const router = express.Router();

const {
   authenticateUser,
   authorizePermission,
} = require('../middleware/authenticate');
const {
   updateUser,
   getUser,
   updatePassword,
} = require('../controllers/user-controller');

router.route('/').get(authenticateUser, getUser);
router.route('/').patch(authenticateUser, updateUser);
router.route('/updatePassword').patch(authenticateUser, updatePassword);

module.exports = router;
