import express from 'express'
import dotenv from 'dotenv'

import { requestLogger } from './middlewares/requestLogger.middleware.js'
import { errorHandler } from './middlewares/errorHandler.middleware.js'

export const app = express()

app.use(express.json())

app.use(requestLogger)

dotenv.config()

app.use(errorHandler)
