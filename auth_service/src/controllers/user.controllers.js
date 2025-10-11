import { asyncHandler } from '../utils/asyncHandler.util.js'
import { ErrorResponse } from '../utils/errorResponse.utils.js'
import { User } from '../models/user.models.js'

// to get all shortened urls of the logged in user
export const getAllShortenedUrls = asyncHandler(async (req, res) => {
    const userId = req.user.id

    const user = await User.findById(userId).select('shortUrls')
    if (!user) {
        throw new ErrorResponse('User not found', 404)
    }

    res.status(200).json({ shortenedUrls: user.shortUrls })
})
