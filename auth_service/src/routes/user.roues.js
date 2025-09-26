import express from 'express'
import { register } from '../controllers/auth.controllers.js'
import { registerValidator } from '../validators/auth.validators.js'
import { validate } from '../middlewares/validate.middleware.js'

const router = express.Router()

router.post('/register', registerValidator, validate, register)

export default router
