const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const path = require('path') // Used for manipulation with path
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

// const uploadPath = path.join(__dirname, 'upload/') // Register the upload path
// fs.ensureDir(uploadPath) // Make sure that he upload path exits
// uploadPath.toString()
// const upload = async (req, res, next) => {
//    req.pipe(req.busboy) // Pipe it trough busboy

//    req.busboy.on('file', (fieldname, file, filename) => {
//       console.log(`Upload of '${filename}' started`)

//       // Create a write stream of the new file
//       const fstream = fs.createWriteStream(path.join(uploadPath, filename))
//       // Pipe it trough
//       file.pipe(fstream)

//       // On finish of the upload
//       fstream.on('close', () => {
//          console.log(`Upload of '${filename}' finished`)
//          res.redirect('back')
//       })
//    })
//    next()
// }
