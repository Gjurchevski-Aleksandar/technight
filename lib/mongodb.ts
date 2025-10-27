import mongoose from 'mongoose';

// Define the shape of our cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global namespace to include our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Get MongoDB URI from environment variables
const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI || MONGODB_URI.length === 0) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global cache to store the mongoose connection.
 * In development, Next.js hot reloading can cause multiple connections.
 * Using a global variable ensures we reuse the same connection across hot reloads.
 */
const cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
};

// Store the cache in the global object for persistence across hot reloads
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Implements connection caching to prevent multiple connections in development.
 * 
 * @returns {Promise<typeof mongoose>} The mongoose instance with an active connection
 */
async function connectToDatabase(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Return existing connection promise if one is in progress
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering to fail fast if no connection
    };

    // Create a new connection promise
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    // Wait for the connection to complete and cache it
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset the promise on error so the next call will retry
    cached.promise = null;
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
