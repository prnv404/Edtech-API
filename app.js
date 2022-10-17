const dotenv = require('dotenv')
dotenv.config()
require('express-async-errors')

const express = require('express')
const app = express()

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const notFound = require('./middleware/not-found')
const errorhandler = require('./middleware/errorhandler')

const authRouter = require('./routes/auth-route')
const userRouter = require('./routes/user-route')
const courseRouter = require('./routes/chapter-subject-route')
const videoRouter = require('./routes/video-route')

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('dev'))
app.use(fileUpload())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/video', videoRouter)

app.use(notFound)
app.use(errorhandler)

module.exports = app
