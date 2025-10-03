import { body, query } from 'express-validator'

export const registerValidator = [
    body('userName')
        .notEmpty()
        .withMessage('User name is required')
        .isLength({ min: 3, max: 20 })
        .withMessage('User name must be between 3 and 20 characters'),

    body('email').isEmail().withMessage('Valid email is required'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
]

export const loginValidator = [
    body('email').isEmail().withMessage('Valid email is required'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
]

export const forgotPasswordValidator = [
    body('email').isEmail().withMessage('Valid email is required'),
]

export const resetPasswordValidator = [
    query('token').notEmpty().withMessage('Reset token is required'),

    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long'),
]
