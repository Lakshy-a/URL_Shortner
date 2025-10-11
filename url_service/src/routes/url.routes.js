import express from 'express'
import {
    deleteUrl,
    getUrlInfo,
    redirectToOriginalUrl,
    shortenUrl,
    updateUrl,
} from '../controllers/url.controllers.js'
import { optionalAuth } from '../middlewares/optionalAuth.controller.js'

const router = express.Router()

router.post('/shorten', optionalAuth, shortenUrl)
router.get('/:shortCode', redirectToOriginalUrl)
router.get('/info/:shortCode', getUrlInfo)
router.put('/:shortCode', updateUrl)
router.delete('/:shortCode', deleteUrl)

export default router
