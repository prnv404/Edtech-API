const Order = require('../models/order-model')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const Course = require('../models/course-model')

const Razorpay = require('razorpay')

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

   const course = await Course.findOne({ standred })

   if (course.pirce !== price) {
      throw new CustomError.BadRequestError('Price dosent match')
   }

   const order = {
      price: price,
      course: course,
      user: req.user.userId,
   }

   let receiptId = Math.random() * 10000

   receiptId.toString()

   const orderResult = await Order.create(order)

   price.toString()

   try {
      const order = await instance.orders.create({
         amount: price * 100,
         currency: 'INR',
         receipt: receiptId,
      })
     
      res.status(StatusCodes.CREATED).json({
         success: true,
         order,
         price,
      })
   } catch (error) {
      console.log(error)
   }
}

module.exports = {
   createOrder,
}
