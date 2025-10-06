import express from 'express'
import {
    deleteUrl,
    getUrlInfo,
    redirectToOriginalUrl,
    shortenUrl,
    updateUrl,
} from '../controllers/url.controllers.js'

const router = express.Router()

router.post('/shorten', shortenUrl)
router.get('/:shortCode', redirectToOriginalUrl)
router.get('/info/:shortCode', getUrlInfo)
router.put('/:shortCode', updateUrl)
router.delete('/:shortCode', deleteUrl)

export default router
