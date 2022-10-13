import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
const app = express()

import notFound from './middleware/not-found.js'
import errorhandler from './middleware/errorhandler.js'

import authRouter from './routes/auth-route.js'
import userRouter from './routes/user-route.js'
import courseRouter from './routes/course-route.js'
import subjectRouter from './routes/subject-route.js'

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('dev'))
app.use(fileUpload())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/subject', subjectRouter)

app.use(notFound)
app.use(errorhandler)

export default app
