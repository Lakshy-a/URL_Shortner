import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
            required: false,
            default: '',
        },
        verificationToken: {
            type: String,
            required: false,
            default: '',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        console.log('Hello')
        next()
    } catch (err) {
        next(err)
    }
})

export const User = mongoose.model('User', userSchema)
