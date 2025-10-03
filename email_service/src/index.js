import dotenv from 'dotenv'
dotenv.config()

import { consumeUserRegistered } from './consumers/userRegistered.consumer.js'
import { connectToRabbitMQ } from './config/connectToRabbitMq.config.js'
import { consumeUserForgotpassword } from './consumers/userForgotPassword.consumer.js'

// Use it
connectToRabbitMQ()
    .then((connection) => {
        consumeUserRegistered()
        consumeUserForgotpassword()
    })
    .catch((err) => {
        console.error('💥 Fatal error:', err)
        process.exit(1)
    })
