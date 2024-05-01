import mongoose from 'mongoose'

export const connectToMongoDB = async (URI) => {
    return mongoose.connect(URI)
}