import connectToDatabase from "../lib/mongodb";
import User from "../models/User";
import Store from "../models/Store";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_core_secret_key_123!";

/**
 * Registers a new Store Admin and their respective Store.
 */
export async function registerStoreAdmin(payload: any) {
    await connectToDatabase();

    const { email, password, firstName, lastName, storeName } = payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email is already registered.");

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newUser = await User.create([{ email, passwordHash, role: "store-admin", firstName, lastName }], { session });
        const storeId = `STR-${Math.floor(Math.random() * 90000) + 10000}`;
        const slug = storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const newStore = await Store.create([{
            storeId, slug, name: storeName, ownerName: `${firstName} ${lastName}`,
            email, adminId: newUser[0]._id, status: "Pending", riskScore: "Low", revenue: 0
        }], { session });

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
 * Validates credentials and generates a JWT.
 */
export async function loginUser(email: string, password: string, requiredRole?: string) {
    await connectToDatabase();

    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) throw new Error("Invalid credentials");
    if (requiredRole && user.role !== requiredRole) throw new Error("Unauthorized access for this domain");

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { userId: user._id, role: user.role, storeId: user.storeId },
        JWT_SECRET,
        { expiresIn: "1d" }
    );

    return { token, user: { id: user._id, email: user.email, role: user.role, storeId: user.storeId } };
}

// ─── Password Reset ───────────────────────────────────────────────────────────
// In-memory OTP store (replace with DB + email delivery in production)
const resetTokenStore = new Map<string, { code: string; expiresAt: number }>();

/**
 * Generates + stores a 6-digit OTP for the given email.
 * Logs to console in dev — integrate Nodemailer/Resend for production.
 */
export async function requestPasswordReset(email: string) {
    await connectToDatabase();
    const user = await User.findOne({ email });
    // Silent success to prevent email enumeration
    if (!user) return { success: true };

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    resetTokenStore.set(email, { code, expiresAt: Date.now() + 15 * 60 * 1000 });

    // DEV: log the code — replace with email in production
    console.log(`[AKI Reset] Code for ${email}: ${code}`);
    return { success: true };
}

/**
 * Verifies the OTP provided by the user.
 */
export async function verifyResetCode(email: string, code: string) {
    const entry = resetTokenStore.get(email);
    if (!entry) throw new Error("No reset code found. Please request a new one.");
    if (Date.now() > entry.expiresAt) {
        resetTokenStore.delete(email);
        throw new Error("Code has expired. Please request a new one.");
    }
    if (entry.code !== code) throw new Error("Invalid code. Please try again.");
    return { success: true };
}

/**
 * Resets the password after OTP is verified.
 */
export async function confirmPasswordReset(email: string, code: string, newPassword: string) {
    await connectToDatabase();
    await verifyResetCode(email, code); // re-verify

    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) throw new Error("User not found.");

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    resetTokenStore.delete(email); // purge used token
    return { success: true };
}
