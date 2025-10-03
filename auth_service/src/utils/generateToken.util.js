import jwt from 'jsonwebtoken'

export const generateAccessToken = (data) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    })
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}

export const generateRefreshToken = (data) => {
    return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    })
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
}

export const genaretResetToken = (data) => {
    return jwt.sign(data, process.env.RESET_TOKEN_SECRET, {
        expiresIn: process.env.RESET_TOKEN_EXPIRY,
    })
}

export const verifyResetToken = (token) => {
    return jwt.verify(token, process.env.RESET_TOKEN_SECRET)
}
