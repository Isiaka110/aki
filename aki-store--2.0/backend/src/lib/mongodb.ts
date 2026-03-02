import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// In dev, calling dotenv.config here is redundant if it's called at the entry point,
// but for standalone scripts/tests we can try to load it from the root.
dotenv.config({ path: path.join(__dirname, '../../../.env.local') });
dotenv.config(); // Also try current directory's .env

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable (e.g., in .env.local for dev or as a system variable in prod)."
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
            console.log("✅ Successfully connected to MongoDB Atlas");
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectToDatabase;
