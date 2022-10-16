let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo(
   process.env.CLIENT_IDENTIFIER,
   process.env.CLIENT_SECRET,
   process.env.PERSONAL_ACCESS_TOKEN
);

const getVemioVideo = async (req, res, next) => {
   const { videoId } = req.query;
   client.request(
      {
         method: 'GET',
         path: `/videos/${videoId}`,
      },
      function (error, body, status_code, headers) {
         if (error) {
            console.log(error);
         }

         req.video = {
            link: body.link,
         };
         // console.log(body.link);
      }
   );
   next();
};

const uploadVemio = async (req, res, next) => {
   let file_name = '{path_to_a_video_on_the_file_system}';
   client.upload(
      file_name,
      {
         name: 'Untitled',
         description: 'The description goes here.',
      },
      function (uri) {
         console.log('Your video URI is: ' + uri);
      },
      function (bytes_uploaded, bytes_total) {
         var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
         console.log(bytes_uploaded, bytes_total, percentage + '%');
      },
      function (error) {
         console.log('Failed because: ' + error);
      }
   );
};

module.exports = getVemioVideo;
