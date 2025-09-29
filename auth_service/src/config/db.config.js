import mongoose from 'mongoose'

export const databaseConnect = mongoose
    .connect(process.env.MONGODB_URI, {
        dbName: process.env.DATABASE_NAME,
    })
    .then(() => {
        console.log('Mongo db connected successfully ✅')
    })
    .catch((error) => {
        console.log('Error in connecting to mongo db', error)
    })
