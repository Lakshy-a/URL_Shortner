import express from 'express'
import {
    forgotPassword,
    login,
    logout,
    register,
    resetPassword,
} from '../controllers/auth.controllers.js'
import { loginValidator, registerValidator } from '../validators/auth.validators.js'
import { validate } from '../middlewares/validate.middleware.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

// Public routes
router.post('/register', registerValidator, validate, register)
router.post('/login', loginValidator, validate, login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
// router.get('/verify-email/:token', authController.verifyEmail);

// Protected routes (require authentication)
// router.get('/me', authMiddleware, authController.getCurrentUser);
router.post('/logout', authMiddleware, logout)
// router.put('/change-password', authMiddleware, authController.changePassword);

export default router
