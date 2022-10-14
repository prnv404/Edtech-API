require('dotenv').config();
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
      console.log(data);
      res.status(200).send({
        message: 'Verification is sent!!',
        phonenumber: phonenumber,
        data,
      });
    });
};

const verifyOTP = ({ res, mobileNO, code }) => {
  console.log(mobileNO)
  client.verify
    .services(process.env.SERVICE_ID)
    .verificationChecks.create({
      to: `+91${mobileNO}`,
      code: code,
    })
    .then((data) => {
      console.log(data)
      if (data.status === 'approved') {
        res.status(200).send({
          message: 'User is Verified!!',
          data,
        });
      }
    });
};

module.exports = {
  createOTP,
  verifyOTP,
};
