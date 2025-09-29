import dotenv from 'dotenv'

dotenv.config()

import { consumeUserRegistered } from './consumers/userRegistered.consumer.js'

console.log('Email service starting...')

consumeUserRegistered()
    .then(() => console.log('Consumer connected to RabbitMQ'))
    .catch((err) => console.error('❌ Failed to connect consumer', err))
