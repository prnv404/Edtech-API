const { StatusCodes } = require('http-status-codes')
const Razorpay = require('razorpay')
const { UserBindingContext } = require('twilio/lib/rest/chat/v2/service/user/userBinding')
const Order = require('../models/order-model')
const CustomError = require('../errors')
const Course = require('../models/course-model')

const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
})

// TODO: PAYMENT VERIFICATION VIA WEBHOOKS
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
        price,
        course,
        user: req.user.userId,
    }

    const receiptId = Math.random() * 10000

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
    res.send('hello')
}

const verifyPayment = async (req, res) => {
    const secret = process.env.VERIFY_SECRET

    console.log(req.body)

    const crypto = require('crypto')

    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    console.log(digest, req.headers['x-razorpay-signature'])

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit')
        // process it
    //    const user = await User.findOne()
    } else {
        // pass it
    }

    res.status(StatusCodes.OK)
}

module.exports = {
    createOrder,
    verifyPayment,
}
