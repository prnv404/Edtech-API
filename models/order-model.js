const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        price: {
            type: Number,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'cancelled', 'paid', 'deliverd', 'failed'],
            default: 'pending',
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        paymentIntentId: {
            type: String,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
