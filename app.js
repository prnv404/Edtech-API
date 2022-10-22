const dotenv = require('dotenv')
dotenv.config()
require('express-async-errors')

// const busboy = require('connect-busboy')
const express = require('express')
const app = express()

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const notFound = require('./middleware/not-found')
const errorhandler = require('./middleware/errorhandler')

const authRouter = require('./routes/auth-route')
const userRouter = require('./routes/user-route')
const subjectRoute = require('./routes/chapter-subject-route')
const videoRouter = require('./routes/video-route')
const courseRouter = require('./routes/course-route')
const paymentRouter = require('./routes/payment-route')

// Initialize the express web server
// app.use(
//    busboy({
//       highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
//    })
// ) // Insert the busboy middle-ware
app.use(fileUpload())
app.use(express.json())
app.use(cors())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(morgan('dev'))

app.use(express.static('./public'))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/subject', subjectRoute)
app.use('/api/v1/video', videoRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/payment', paymentRouter)

app.use(notFound)
app.use(errorhandler)

module.exports = app
