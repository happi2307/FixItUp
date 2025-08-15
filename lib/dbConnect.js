import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGODB_URI || ''

if (!MONGO_URI) {
  console.warn('MONGODB_URI not set — falling back to file-based JSON store (dev)')
}

let cached = global.mongoose

if (!cached) cached = global.mongoose = { conn: null, promise: null }

export async function dbConnect() {
  if (!MONGO_URI) return null
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    const opts = { bufferCommands: false }
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
