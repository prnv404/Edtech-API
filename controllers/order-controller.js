const Order = require('../models/order-model')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const Course = require('../models/course-model')

const Razorpay = require('razorpay')
const { findOne } = require('../models/order-model')

var instance = new Razorpay({
   key_id: process.env.KEY_ID,
   key_secret: process.env.KEY_SECRET,
})

/**
 * It creates an order in the database and then creates a payment order in Razorpay
 * @param req - The request object.
 * @param res - The response object.
 */
const createOrder = async (req, res) => {
   const { price, standred } = req.body
   if (!price || !standred) {
      throw new CustomError.BadRequestError('Please provide all values')
   }
   const course = await findOne({ standred })
   if (course.pirce !== price) {
      throw new CustomError.BadRequestError('Price dosent match')
   }

   const order = {
      price: price,
      course: course,
      user: req.user.userId,
   }

   const orderResult = await Order.create(order)
   price.toString()

   const options = {
      amount: price * 100, // amount in the smallest currency unit
      currency: 'INR',
      receipt: req.user.userId,
   }
   instance.orders.create(options, function (err, order) {
      if (err) console.log(err)
      console.log(order)
      res.send({ orderId: order.id })
   })
}

module.exports = {
   createOrder,
   
}
