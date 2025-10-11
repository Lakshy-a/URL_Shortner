import jwt from 'jsonwebtoken'
import { ErrorResponse } from '../utils/errorResponse.utils copy'

export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.user = decoded
            next()
        } catch (err) {
            console.error('JWT verification failed:', err)
            throw new ErrorResponse('Unauthorized: Invalid token', 401)
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized: No token provided' })
    }
}
