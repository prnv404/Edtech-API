const dotenv = require('dotenv');
dotenv.config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const app = express();

const notFound = require('./middleware/not-found');
const errorhandler = require('./middleware/errorhandler');

const authRouter = require('./routes/auth-route');
const userRouter = require('./routes/user-route');
const courseRouter = require('./routes/course-route');
// const subjectRouter = require('./routes/subject-route');

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(morgan('dev'));
app.use(fileUpload());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/course', courseRouter);
// app.use('/api/v1/subject', subjectRouter);

app.use(notFound);
app.use(errorhandler);

module.exports = app;
