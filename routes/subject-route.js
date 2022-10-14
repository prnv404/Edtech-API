const express = require('express');
const router = express.Router();

const {
  getSubjects, createSubjects
} = require('../controllers/subject-controller');
const {
  authenticateUser,
  authorizePermission,
} = require('../middleware/authenticate');

router
  .route('/')
  .get(authenticateUser, getSubjects)
  .post(authenticateUser, authorizePermission('admin'), createSubjects);

module.exports = router;
