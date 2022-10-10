import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()

import notFound from './middleware/not-found.js'

app.use(notFound)

export default app
