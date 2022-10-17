const Order = require('../models/order-model')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')

const Razorpay = require('razorpay')

var instance = new Razorpay({
   key_id: process.env.KEY_ID,
   key_secret: process.env.KEY_SECRET,
})

const createOrderId = async (req, res) => {
   const { amount } = req.body
   const options = {
      amount: amount, // amount in the smallest currency unit
      currency: 'INR',
      receipt: 'order_rcptid_11',
   }
   instance.orders.create(options, function (err, order) {
      if (err) console.log(err)
      console.log(order)
      res.send({ orderId: order.id })
   })
}

const createOrder = async (req, res) => {
   const { price, course } = req.body
}

module.exports = {
   createOrderId,
   createOrder,
}
