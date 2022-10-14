const dotenv = require('dotenv');
dotenv.config();
const expressAsyncHandler = require('express-async-handler');
const connectDB = require('./db/connect.js');
const User = require('./models/user-model.js');
const fs = require('fs');
const data = fs.readFileSync('./edtech.json', (err, data) => {
  console.log(data);
});

console.log(data);

const start = async (url) => {
  try {
    await connectDB(url);
    // await User.deleteMany({})
    await User.insertMany({ data });
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

start(process.env.MONGO_URL);
