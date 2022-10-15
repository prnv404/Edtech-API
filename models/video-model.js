const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
   title: {
      type: String,
      required: [true, ' video have a Name '],
      maxlength: 50,
      minlength: 6,
   },

   discription: {
      type: String,
      required: [true, 'Video have a discription'],
      maxlength: 200,
      minlength: 10,
   },

   standred: {
      type: String,
      enum: ['8', '9', '10', '11', '12'],
      required: [true, 'Video have a standred'],
   },

   subject: {
      type: String,
      required: [true, 'Video have a standred'],
   },

   chapter: {
      type: String,
      required: [true, 'Video have a chapter'],
   },

   chapterNo: {
      type: Number,
      required: [true, 'Video have a chapterNumber'],
   },

   videoPath: {
      type: String,
      required: [true, 'Video have a videoPath '],
   },

   positionOfVideo: {
      type: Number,
      required: [true, 'Video have a positon number'],
   },
});

module.exports = mongoose.model('Video', videoSchema);
