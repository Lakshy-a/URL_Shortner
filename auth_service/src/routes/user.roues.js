import express from 'express'
import { login, register } from '../controllers/auth.controllers.js'
import { loginValidator, registerValidator } from '../validators/auth.validators.js'
import { validate } from '../middlewares/validate.middleware.js'

const router = express.Router()

// Public routes
router.post('/register', registerValidator, validate, register)
router.post('/login', loginValidator, validate, login)
// router.post('/forgot-password', authController.forgotPassword);
// router.post('/reset-password', authController.resetPassword);
// router.get('/verify-email/:token', authController.verifyEmail);

// Protected routes (require authentication)
// router.get('/me', authMiddleware, authController.getCurrentUser);
// router.post('/logout', authMiddleware, authController.logout);
// router.put('/change-password', authMiddleware, authController.changePassword);

export default router
