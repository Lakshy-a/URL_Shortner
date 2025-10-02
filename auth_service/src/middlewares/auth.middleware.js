import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

import jwt from 'jsonwebtoken'

export const authMiddleware = asyncHandler((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
}
)