import bcrypt from 'bcryptjs'

import { asyncHandler } from '../utils/asyncHandler.util.js'
import { ErrorResponse } from '../utils/errorResponse.utils.js'
import {
    genaretResetToken,
    generateAccessToken,
    generateRefreshToken,
    verifyResetToken,
} from '../utils/generateToken.util.js'
import { User } from '../models/user.models.js'
import { publishUserForgotPassword, publishUserRegistered } from '../events/userRegistered.event.js'

export const register = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body

    const isExist = await User.findOne({ email })
    if (isExist) throw new ErrorResponse('User with this email already exist', 409)

    const newUser = new User({
        userName,
        email,
        password,
    })

    const verificationToken = genaretResetToken({ id: newUser._id })
    newUser.verificationToken = verificationToken

    const verificationUrl = `http://localhost:8000/api/v1/auth/verify-email/${verificationToken}`

    const saveUser = await newUser.save()
    await publishUserRegistered({
        email: saveUser.email,
        userName: saveUser.userName,
        token: verificationUrl,
    })

    res.status(201).json({ message: 'User registered successfully' })
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) throw new ErrorResponse('User does not exist', 400)

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) throw new ErrorResponse('Incorrect password', 401)

    const accessToken = generateAccessToken({
        id: user._id,
        email,
        userName: user.userName,
    })

    const refreshToken = generateRefreshToken({
        id: user._id,
        email,
        userName: user.userName,
    })

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: 'Login successful',
        token: accessToken,
    })
})

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        throw new ErrorResponse('User not found', 404)
    }

    // Generate reset token
    const resetToken = genaretResetToken({ id: user._id })
    const resetUrl = `http://localhost:8000/api/v1/auth/reset-password?token=${resetToken}`

    await publishUserForgotPassword({ email, userName: user.userName, resetUrl })

    res.status(200).json({ message: 'Password reset link sent to email (simulated)' })
})

export const logout = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const user = await User.findById(userId)
    if (!user) {
        throw new ErrorResponse('User not found', 404)
    }

    // Remove refresh token from DB
    user.refreshToken = ''
    await user.save({ validateBeforeSave: false })

    res.status(200).json({ message: 'Logged out successfully' })
})

export const resetPassword = asyncHandler(async (req, res) => {
    const { newPassword } = req.body
    const { token } = req.query

    const decoded = verifyResetToken(token)
    const user = await User.findById(decoded.id)

    if (!user) {
        throw new ErrorResponse('User not found', 404)
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword } })

    res.status(200).json({ message: 'Password has been reset successfully' })
})

export const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params

    const decoded = verifyResetToken(token)
    const user = await User.findById(decoded.id)

    if (!user) {
        throw new ErrorResponse('User not found', 404)
    }

    if (user.isVerified) {
        return res.status(400).json({ message: 'Email is already verified' })
    }

    user.isVerified = true
    user.verificationToken = ''
    await user.save({ validateBeforeSave: false })

    res.status(200).json({ message: 'Email verified successfully (simulated)' })
})

export const getCurrentUser = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const user = await User.findById(userId).select('-password -refreshToken -verificationToken')

    if (!user) {
        throw new ErrorResponse('User not found', 404)
    }

    res.status(200).json({ user })
})

export const changePassword = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const { currentPassword, newPassword } = req.body

    const user = await User.findById(userId)
    if (!user) {
        throw new ErrorResponse('User not found', 404)
    }

    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isPasswordMatch) throw new ErrorResponse('Current password is incorrect', 401)

    user.password = newPassword
    await user.save()

    res.status(200).json({ message: 'Password changed successfully' })
})
