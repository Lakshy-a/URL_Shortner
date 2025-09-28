import express from 'express'
import { login, register } from '../controllers/auth.controllers.js'
import { loginValidator, registerValidator } from '../validators/auth.validators.js'
import { validate } from '../middlewares/validate.middleware.js'

const router = express.Router()

router.post('/register', registerValidator, validate, register)
router.post('/login', loginValidator, validate, login)

export default router
