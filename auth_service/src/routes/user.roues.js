import express from 'express'
import {
    changePassword,
    forgotPassword,
    getCurrentUser,
    login,
    logout,
    register,
    resetPassword,
    verifyEmail,
} from '../controllers/auth.controllers.js'
import {
    forgotPasswordValidator,
    loginValidator,
    registerValidator,
    resetPasswordValidator,
} from '../validators/auth.validators.js'
import { validate } from '../middlewares/validate.middleware.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

// Public routes
router.post('/register', registerValidator, validate, register)
router.post('/login', loginValidator, validate, login)
router.post('/forgot-password', forgotPasswordValidator, validate, forgotPassword)
router.post('/reset-password', resetPasswordValidator, validate, resetPassword)
router.get('/verify-email/:token', verifyEmail)

// Protected routes (require authentication)
router.get('/me', authMiddleware, getCurrentUser)
router.post('/logout', authMiddleware, logout)
router.put('/change-password', authMiddleware, changePassword)

export default router
