const dotenv = require('dotenv')
dotenv.config()
require('express-async-errors')

const express = require('express')
const app = express()

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const notFound = require('./middleware/not-found')
const errorhandler = require('./middleware/errorhandler')

const authRouter = require('./routes/auth-route')
const userRouter = require('./routes/user-route')
const courseRouter = require('./routes/course-route')
const planRouter = require('./routes/plan-route')
const paymentRouter = require('./routes/payment-route')
const videoRouter = require('./routes/video-route')

app.use(express.json())
app.use(cors())
app.use(cookieParser(process.env.JWT_SECRET))

if (process.env.NODE_ENV === 'Dev') {
    app.use(morgan('dev'))
}


app.use(express.static('./public'))


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/subject', courseRouter)
app.use('/api/v1/plan', planRouter)
app.use('/api/v1payment', paymentRouter)
app.use('/api/v1/video', videoRouter)

app.use(notFound)
app.use(errorhandler)

module.exports = app
