require('dotenv').config()
const { StatusCodes } = require('http-status-codes')

const client = require('twilio')(
    process.env.ACCOUNT_SID,
    process.env.AUTH_TOKEN
)

const createOTP = async ({ phoneNumber, channel }) => {
    const sendOtp = await client.verify
        .services(process.env.SERVICE_ID)
        .verifications.create({
            to: `+91${phoneNumber}`,
            channel: channel === 'call' ? 'call' : 'sms',
        })

    return sendOtp
}

const verifyOTP = async ({ phoneNumber, code }) => {
    const isVerified = await client.verify
        .services(process.env.SERVICE_ID)
        .verificationChecks.create({
            to: `+91${phoneNumber}`,
            code,
        })

    return isVerified
}

module.exports = {
    createOTP,
    verifyOTP,
}
