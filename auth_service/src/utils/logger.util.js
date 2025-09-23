import pino from 'pino'
import PinoRoll from 'pino-roll'
import fs from 'fs'

// Ensure logs directory exists
if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs', { recursive: true })
}

const logger = pino(
    {
        level: process.env.LOG_LEVEL || 'info',
        timestamp: pino.stdTimeFunctions.isoTime,
        formatters: {
            level: (label) => ({ level: label.toUpperCase() }),
        },
    },
    process.env.NODE_ENV !== 'production'
        ? pino.transport({
              target: 'pino-pretty',
              options: {
                  colorize: true,
                  translateTime: 'SYS:standard',
                  ignore: 'pid,hostname',
              },
          })
        : PinoRoll({
              file: './logs/app.log',
              frequency: 'daily', // rotate daily
              size: '10m', // max file size
              limit: {
                  count: 14, // keep 14 files (14 days)
              },
          })
)

export default logger
