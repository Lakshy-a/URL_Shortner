import { asyncHandler } from '../utils/asyncHandler.util.js'
import { ErrorResponse } from '../utils/errorResponse.utils.js'
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.util.js'
import { User } from '../models/user.models.js'

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

    res.status(201).json({ message: 'User registered successfully' })
})
