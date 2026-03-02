import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Environment Initialization:
const loadEnv = () => {
    const paths = [
        path.resolve(process.cwd(), '.env'),
        path.resolve(process.cwd(), '.env.local'),
        path.resolve(process.cwd(), 'backend', '.env'),
        path.resolve(process.cwd(), 'backend', '.env.local'),
        path.resolve(__dirname, '../../.env'),
        path.resolve(__dirname, '../../.env.local'),
        path.resolve(__dirname, '../../../../.env.local')
    ];

    console.log(`[AKI] Current Working Directory: ${process.cwd()}`);
    paths.forEach(p => {
        const result = dotenv.config({ path: p });
        if (result.parsed) {
            const keys = Object.keys(result.parsed);
            console.log(`[AKI] Successfully loaded ${keys.length} keys from: ${p}`);
            if (keys.length > 0) {
                console.log(`[AKI] Keys discovered: ${keys.join(', ')}`);
                // Force-assign to process.env to ensure visibility
                Object.assign(process.env, result.parsed);
            }
        }
    });
};

loadEnv();

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
        console.log(`[AKI] Current Environment Keys: ${Object.keys(process.env).join(', ')}`);
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
