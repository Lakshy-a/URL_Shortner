import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8)

import { asyncHandler } from '../utils/asyncHandler.util.js'
import { errorHandler } from '../middlewares/errorHandler.middleware.js'
import { ErrorResponse } from '../utils/errorResponse.utils copy.js'

import { Url } from '../models/url.model.js'

export const shortenUrl = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body
    const shortCode = nanoid()

    const ifExists = await Url.findOne({ originalUrl })
    if (ifExists) {
        return res.status(200).json({
            message: 'URL shortened successfully',
            shortUrl: `${process.env.BASE_URL}/${ifExists.shortCode}`,
        })
    }

    if (!originalUrl || !/^https?:\/\/\w+/.test(originalUrl)) {
        throw new ErrorResponse('Please provide a valid URL', 400)
    }

    const shortUrl = `${process.env.BASE_URL}/${shortCode}`
    console.log('Hello', shortUrl)

    const newUrl = new Url({ originalUrl, shortCode })
    await newUrl.save()

    res.status(201).json({ message: 'URL shortened successfully', shortUrl })
})

export const redirectToOriginalUrl = asyncHandler(async (req, res) => {
    const { shortCode } = req.params

    const urlEntry = await Url.findOne({ shortCode })
    if (!urlEntry) {
        throw new ErrorResponse('URL not found', 404)
    }

    urlEntry.clicks += 1
    await urlEntry.save()

    res.redirect(urlEntry.originalUrl)
})

export const getUrlInfo = asyncHandler(async (req, res) => {
    const { shortCode } = req.params

    const urlEntry = await Url.findOne({ shortCode })
    if (!urlEntry) {
        throw new ErrorResponse('URL not found', 404)
    }

    res.status(200).json({
        originalUrl: urlEntry.originalUrl,
        shortCode: urlEntry.shortCode,
        clicks: urlEntry.clicks,
        createdAt: urlEntry.createdAt,
    })
})

export const updateUrl = asyncHandler(async (req, res) => {
    const { shortCode } = req.params
    const { newUrl } = req.body

    const urlEntry = await Url.findOne({ shortCode })
    if (!urlEntry) {
        throw new ErrorResponse('URL not found', 404)
    }

    urlEntry.originalUrl = newUrl
    await urlEntry.save()

    res.status(200).json({ message: 'URL updated successfully', newUrl: urlEntry.originalUrl })
})

export const deleteUrl = asyncHandler(async (req, res) => {
    const { shortCode } = req.params

    const urlEntry = await Url.findOneAndUpdate({ shortCode }, { isActive: false }, { new: true })
    if (!urlEntry) {
        throw new ErrorResponse('URL not found', 404)
    }

    res.status(200).json({ message: 'URL deleted successfully' })
})