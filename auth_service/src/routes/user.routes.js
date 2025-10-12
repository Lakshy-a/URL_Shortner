import express from 'express'
import { getAllShortenedUrls, getAllShortenedUrlsByUserId } from '../controllers/user.controllers.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
const router = express.Router()

router.get('/shortened-urls', authMiddleware, getAllShortenedUrls)  // list all the url created by the logged in user
router.get('/:userId/shortened-urls', getAllShortenedUrlsByUserId)  // list all the url created by a specific user

export default router
