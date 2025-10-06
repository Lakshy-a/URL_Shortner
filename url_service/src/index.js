import { app } from './app.js'
import { databaseConnect } from './config/db.config.js'
import urlRoutes from './routes/url.routes.js'

const PORT = process.env.PORT

databaseConnect

app.get('/', (req, res) => {
    res.status(200).json({ message: 'URL service running okay...' })
})

app.use('/api/v1/url/', urlRoutes)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} 🚀`)
})
