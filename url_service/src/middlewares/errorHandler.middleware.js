import logger from '../utils/logger.util.js'

export const errorHandler = (err, req, res, next) => {
    logger.error(
        {
            method: req.method,
            url: req.originalUrl,
            stack: err.stack,
            message: err.message,
        },
        'Error occurred'
    )

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    })
}
