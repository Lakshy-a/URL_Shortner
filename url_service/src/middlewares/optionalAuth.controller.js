import jwt from 'jsonwebtoken'

export const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.user = decoded
        } catch (err) {
            console.error('JWT verification failed:', err)
            req.user = null
        }
    } else {
        req.user = null
    }

    next()
}
