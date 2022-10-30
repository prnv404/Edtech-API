const multer = require('multer')
const path = require('path')

const videoStorage = multer.diskStorage({
   destination: 'videos', // Destination to store video
   filename: (req, file, cb) => {
      cb(
         null,
         file.fieldname + '_' + Date.now() + path.extname(file.originalname)
      )
   },
   
})

const videoUpload =  multer({
   storage: videoStorage,
   limits: {
      fileSize: 2e9, //  2GB
   },
   fileFilter(req, file, cb) {
      // upload only mp4 and mkv format
      if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
         return cb(new Error('Please upload a video'))
      }
      cb(undefined, true)
   },
})

module.exports = videoUpload
