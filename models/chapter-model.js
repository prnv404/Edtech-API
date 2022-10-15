const mongoose = require('mongoose');

const chapterSchema = mongoose.Schema({
   subject: {
      type: String,
      required: [true, 'subject have standred'],
   },
   chapter: {
      type: String,
      required: [true, 'Please provide all subject realated to standred'],
    },
   
});

module.exports = mongoose.model('Chapter', chapterSchema);
