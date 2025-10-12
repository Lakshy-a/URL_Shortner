import express from 'express'
import { getAllShortenedUrls } from '../controllers/user.controllers.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
const router = express.Router()

router.get('/shortened-urls', authMiddleware, getAllShortenedUrls)

export default router
