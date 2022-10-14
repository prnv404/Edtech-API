require('dotenv').config();
const { StatusCodes } = require('http-status-codes');

const client = require('twilio')(
   process.env.ACCOUNT_SID,
   process.env.AUTH_TOKEN
);

const createOTP = ({ res, phonenumber, channel }) => {
   client.verify
      .services(process.env.SERVICE_ID)
      .verifications.create({
         to: `+91${phonenumber}`,
         channel: channel === 'call' ? 'call' : 'sms',
      })
      .then((data) => {
         res.status(200).send({
            message: 'Success',
            phonenumber: `verification send to ${phonenumber}`,
         });
      })
      .catch((err) => {
         res.status(StatusCodes.BAD_REQUEST).json({
            message: 'something went wrong',
            err,
         });
      });
};

const verifyOTP = ({ res, mobileNO, code }) => {
   client.verify
      .services(process.env.SERVICE_ID)
      .verificationChecks.create({
         to: `+91${mobileNO}`,
         code: code,
      })
      .then((data) => {
         if (data.status === 'approved') {
            res.status(200).send({
               message: 'User is Verified!!',
               data,
            });
         } else {
            res.status(StatusCodes.BAD_REQUEST).json({
               message: 'OTP is not corrected',
               phonenumber: mobileNO,
            });
         }
      })
      .catch((err) => {
         res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Someting wrong',
            err,
         });
      });
};

module.exports = {
   createOTP,
   verifyOTP,
};
