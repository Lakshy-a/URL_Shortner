import mongoose from 'mongoose'

export const databaseConnect = mongoose
    .connect(`${process.env.MONGO_URI}`)
    .then(() => {
        console.log('Mongo db connected successfully ✅')
    })
    .catch((error) => {
        console.log('Error in connecting to mongo db', error)
    })
