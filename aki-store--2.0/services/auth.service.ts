import connectToDatabase from "../lib/mongodb";
import User, { IUser } from "../models/User";
import Store from "../models/Store";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_core_secret_key_123!";

/**
 * Registers a new Store Admin and their respective Store.
 * This directly syncs the personalized store with the store-admin.
 */
export async function registerStoreAdmin(payload: any) {
    await connectToDatabase();

    const { email, password, firstName, lastName, storeName } = payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email is already registered.");
    }

    // Hash the secure password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Create the Store Admin User
        const newUser = await User.create([{
            email,
            passwordHash,
            role: "store-admin",
            firstName,
            lastName
        }], { session });

        // Generate a random Store ID
        const storeId = `STR-${Math.floor(Math.random() * 90000) + 10000}`;

        // Create the personalized Store directly linked to this Admin
        const newStore = await Store.create([{
            storeId,
            name: storeName,
            ownerName: `${firstName} ${lastName}`,
            email: email,
            adminId: newUser[0]._id, // Syncing Store back to Admin
            status: "Pending", // Requires Super-Admin approval
            riskScore: "Low",
            revenue: 0
        }], { session });

        // Update the User to link back to the Store
        newUser[0].storeId = newStore[0]._id;
        await newUser[0].save({ session });

        await session.commitTransaction();
        session.endSession();

        return { user: newUser[0], store: newStore[0] };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}

/**
 * Validates credentials and generates a secure JWT token for a user.
 * Work for both Super Admin and Store Admin.
 */
export async function loginUser(email: string, password: string, requiredRole?: string) {
    await connectToDatabase();

    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) {
        throw new Error("Invalid credentials");
    }

    if (requiredRole && user.role !== requiredRole) {
        throw new Error("Unauthorized access for this domain");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user._id, role: user.role, storeId: user.storeId },
        JWT_SECRET,
        { expiresIn: "1d" }
    );

    return {
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
            storeId: user.storeId
        }
    };
}
