import rateLimit from 'express-rate-limit'

const rateLimitConfig = {
    '/auth/login': {
        windowMs: 15 * 60 * 1000,
        max: 5,
        message: 'Too many login attempts, try later.',
    },
    '/auth/register': {
        windowMs: 15 * 60 * 1000,
        max: 10,
        message: 'Too many registration attempts, try later.',
    },
    '/api': { windowMs: 15 * 60 * 1000, max: 200, message: 'Too many requests, try later.' },
}

// Generate rate limiters dynamically
export const rateLimiters = {}
for (const [route, options] of Object.entries(rateLimitConfig)) {
    rateLimiters[route] = rateLimit({
        windowMs: options.windowMs,
        max: options.max,
        message: options.message,
        standardHeaders: true,
        legacyHeaders: false,
    })
}
