const mongoose = require('mongoose');
const verifiedSchema = mongoose.Schema({
   verified: {
      type: Boolean,
      required: true,
   },
   userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
   },
});


module.exports = mongoose.model("Verify",verifiedSchema)