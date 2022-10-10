import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
const app = express()

import authRouter from './routes/auth-route.js'
import notFound from './middleware/not-found.js'
app.use(morgan('dev'))
app.use('/api/v1/auth', authRouter)

app.use(notFound)

export default app
