import dotenv from 'dotenv'
dotenv.config()

import { consumeUserRegistered } from './consumers/userRegistered.consumer.js';
import { connectToRabbitMQ } from './config/connectToRabbitMq.config.js';

// Use it
connectToRabbitMQ()
    .then(connection => {
        consumeUserRegistered();
    })
    .catch(err => {
        console.error('💥 Fatal error:', err);
        process.exit(1);
    });
