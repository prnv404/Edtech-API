import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
const app = express()

import notFound from './middleware/not-found.js'
import errorhandler from './middleware/errorhandler.js'

import authRouter from './routes/auth-route.js'

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser(process.env.JWT_SECRET))



app.use('/api/v1/auth', authRouter)

app.use(notFound)
app.use(errorhandler)

export default app
