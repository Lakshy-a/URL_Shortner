import { app } from './app.js'
import { connectToRabbitMQ } from './config/connectToRabbitMq.config.js'
import { databaseConnect } from './config/db.config.js'
import { consumeUserCreatedShortUrl } from './consumers/createdShortUrl.consumer.js'
import authRoutes from './routes/auth.roues.js'
import userRoutes from './routes/user.routes.js'

const port = process.env.PORT || 3000

// connect to db
databaseConnect

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Running okay' })
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)

connectToRabbitMQ()
    .then(() => {
        console.log('Connected to RabbitMQ')
        consumeUserCreatedShortUrl()
    })
    .catch((err) => {
        console.error('Failed to connect to RabbitMQ:', err)
        process.exit(1)
    })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
