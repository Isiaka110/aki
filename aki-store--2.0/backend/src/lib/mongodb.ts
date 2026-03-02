import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// More aggressive env loading for containers & local use
dotenv.config(); // Standard .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env.local') }); // Local dev relative path
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // Relative to dist or src

interface MongooseCache {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development.
 */
declare global {
    var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<mongoose.Mongoose> {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        console.error("❌ CRITICAL: MONGODB_URI is not defined.");
        throw new Error("Please define the MONGODB_URI environment variable in your hosting provider's dashboard or .env file.");
    }

    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached!.promise = mongoose.connect(MONGODB_URI as string, opts).then((m: mongoose.Mongoose) => {
            console.log("✅ Successfully connected to MongoDB Atlas");
            return m;
        });
    }

    try {
        cached!.conn = await cached!.promise;
    } catch (e) {
        cached!.promise = null;
        throw e;
    }

    return cached!.conn;
}

export default connectToDatabase;
