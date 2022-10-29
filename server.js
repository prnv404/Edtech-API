const app = require('./app.js');
const connectDB = require('./db/connect.js');
const port = process.env.PORT || 3000;


    
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
