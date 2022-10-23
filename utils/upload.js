const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const path = require('path') 
const fs = require('fs-extra')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const upload = async (req, res, next) => {
   await s3
      .putObject({
         Body: 'hello world',
         Bucket: 'cyclic-drab-teal-caiman-hose-ap-southeast-2',
         Key: 'uploads/my_file.txt',
      })
      .promise()
   next()
}

module.exports = upload

