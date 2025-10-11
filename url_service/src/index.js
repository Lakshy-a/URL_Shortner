import { app } from './app.js'
import { connectToRabbitMQ } from './config/connectToRabbitMq.config.js'
import { databaseConnect } from './config/db.config.js'
import { publishUserCreatedShortUrl } from './publishers/createdShortUrl.publisher.js'
import urlRoutes from './routes/url.routes.js'

const PORT = process.env.PORT

databaseConnect

app.get('/', (req, res) => {
    res.status(200).json({ message: 'URL service running okay...' })
})

app.use('/api/v1/url/', urlRoutes)

connectToRabbitMQ()
    .then((connection) => {
        const testPayload = {
            userId: '123',
            fullUrl: 'https://example.com',
            shortUrl: 'abc123',
        }
        publishUserCreatedShortUrl(testPayload)
    })
    .catch((err) => {
        console.error('💥 Fatal error:', err)
        process.exit(1)
    })

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} 🚀`)
})
