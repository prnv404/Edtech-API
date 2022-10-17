const express = require('express')
const router = express.Router()

const {
   authenticateUser,
   authorizePermission,
} = require('../middleware/authenticate')

const { createOrder } = require('../controllers/order-controller')

router.route('/').post(authenticateUser, createOrder)

module.exports = router
