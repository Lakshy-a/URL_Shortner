import bcrypt from 'bcryptjs'

import { asyncHandler } from '../utils/asyncHandler.util.js'
import { ErrorResponse } from '../utils/errorResponse.utils.js'
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.util.js'
import { User } from '../models/user.models.js'
import { publishUserRegistered } from '../events/userRegistered.event.js'

export const register = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body

    const isExist = await User.findOne({ email })
    if (isExist) throw new ErrorResponse('User with this email already exist', 409)

    const newUser = new User({
        userName,
        email,
        password,
    })

    const saveUser = await newUser.save()
    await publishUserRegistered({ email: saveUser.email, userName: saveUser.userName })

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
    })

    res.status(200).json({
        success: true,
        message: 'Login successful',
        token: accessToken,
    })
})
