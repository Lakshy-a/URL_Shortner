import { body } from 'express-validator'

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
