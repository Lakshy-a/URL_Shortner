import { app } from './app.js'
import { databaseConnect } from './config/db.config.js'
import userRoutes from './routes/user.roues.js'

const port = process.env.PORT || 3000

// connect to db
databaseConnect

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Running okay' })
})

app.use('/api/v1/auth', userRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
