import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema(
    {
        shortCode: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true,
        },

        originalUrl: {
            type: String,
            required: true,
            trim: true,
        },

        clicks: {
            type: Number,
            default: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            index: true,
            default: null,
        },

        expiresAt: {
            type: Date,
            default: null,
            index: true,
        },
        //   customAlias: {
        //     type: String,
        //     unique: true,
        //     sparse: true,
        //     trim: true
        //     // Only allowed if userId exists (logged in users)
        //   },

        // clickLimit: {
        //     type: Number,
        //     default: null
        //     // Only set if userId is null (anonymous users)
        // },

        //   expiresAt: {
        //     type: Date,
        //     default: null,
        //     index: true
        //     // Only set if userId is null (anonymous users)
        //   },

        //   password: {
        //     type: String,
        //     default: null
        //   },
    },
    {
        timestamps: true,
    }
)

// // Pre-save middleware to enforce business rules
// urlSchema.pre('save', function(next) {
//   // If user is logged in (userId exists)
//   if (this.userId) {
//     // Remove expiration and click limits for logged-in users
//     this.expiresAt = null;
//     this.clickLimit = null;
//   } else {
//     // If user is NOT logged in (anonymous)
//     // Remove custom alias
//     this.customAlias = null;

//     // Set default expiration if not set (e.g., 7 days)
//     if (!this.expiresAt) {
//       this.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
//     }

//     // Optionally set default click limit if not set
//     // if (!this.clickLimit) {
//     //   this.clickLimit = 100;
//     // }
//   }

//   next();
// });

// // Validation method
// urlSchema.methods.canUseCustomAlias = function() {
//   return this.userId != null;
// };

// urlSchema.methods.isExpired = function() {
//   return this.expiresAt && new Date() > this.expiresAt;
// };

// urlSchema.methods.hasReachedClickLimit = function() {
//   return this.clickLimit && this.clicks >= this.clickLimit;
// };

export const Url = mongoose.model('Url', urlSchema)
