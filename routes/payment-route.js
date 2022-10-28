const express = require('express')
const router = express.Router()

const {
   authenticateUser,
   authorizePermission,
} = require('../middleware/authenticate')

const { createOrder,verifyPayment } = require('../controllers/payment-controller')

router.route('/').post(authenticateUser, createOrder)
router.route('/verify').post(verifyPayment)

module.exports = router
