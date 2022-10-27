let Vimeo = require('vimeo').Vimeo
let client = new Vimeo(
   process.env.CLIENT_IDENTIFIER,
   process.env.CLIENT_SECRET,
   process.env.PERSONAL_ACCESS_TOKEN
)

const uploadVideo = async (req, res, next) => {
  //  let file_name = req.file.file_name
  let file_name = 'hello.mp4'
   client.upload(
      file_name,
      {
         name: `${file_name}`,
         description: 'The description goes here.',
      },
      function (uri) {
         console.log('Your video URI is: ' + uri)
      },
      function (bytes_uploaded, bytes_total) {
         var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2)
         console.log(bytes_uploaded, bytes_total, percentage + '%')
      },
      function (error) {
         console.log('Failed because: ' + error)
      }
   )
   next()
}

module.exports = uploadVideo
