import connectToDatabase from "../lib/mongodb";
import User from "../models/User";
import Store from "../models/Store";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_changeme";

// Optional: SMTP configuration for sending real emails
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

let transporter: nodemailer.Transporter | null = null;
if (smtpHost && smtpUser && smtpPass) {
    transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
    });
}

/**
 * Registers a new Store Admin and their respective Store.
 */
export async function registerStoreAdmin(payload: any) {
    await connectToDatabase();

    const { email, password, firstName, lastName, storeName } = payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email is already registered.");

    const slug = storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const existingStore = await Store.findOne({ slug });
    if (existingStore) throw new Error("This Boutique Name is already taken. Please choose another.");

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newUser = await User.create([{ email, passwordHash, role: "store-admin", firstName, lastName }], { session });
        const storeId = `STR-${Math.floor(Math.random() * 90000) + 10000}`;

        // Nigerian convention: If the names are provided, we ensure they are capitalized properly
        const formattedOwnerName = `${lastName.toUpperCase()}, ${firstName}`;

        const newStore = await Store.create([{
            storeId, slug, name: storeName, ownerName: formattedOwnerName,
            email, adminId: newUser[0]._id, status: "Pending", riskScore: "Low", revenue: 0, nin: "", verificationDocumentType: "", cacNumber: "", verificationStatus: "Pending"
        }], { session });

        newUser[0].storeId = newStore[0]._id;
        await newUser[0].save({ session });
        await session.commitTransaction();
        session.endSession();

        // DEV: Simulated platform-styled dispatch email
        console.log(`
==================================================
[AKI Platform] DISPATCH: Welcome to the Directory
==================================================
To: ${email}
Subject: Your Store is Reserved.

Welcome, ${formattedOwnerName}.
Your bespoke storefront "${storeName}" has been successfully reserved. 
Our moderation team will review your application shortly.

Enjoy unparalleled commerce.

Regards,
AKI Executive Suite
==================================================
`);

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

// ─── Password Recovery ────────────────────────────────────────────────────────
/**
 * Generates a strong temporary password, assigns it to the user,
 * and logs the new password in a styled simulated email. 
 */
export async function requestPasswordReset(email: string) {
    await connectToDatabase();
    const user = await User.findOne({ email }).select("+passwordHash");
    // Silent success to prevent email enumeration
    if (!user) return { success: true };

    // Generate a secure 10-char temporary password
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let tempPassword = '';
    for (let i = 0; i < 10; i++) {
        tempPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(tempPassword, salt);
    await user.save();

    const emailBody = `
==================================================
[AKI Platform] DISPATCH: Password Recovery
==================================================
To: ${email}
Subject: Your New Secure Password

A recovery protocol was initiated for your store.
We have generated a new secure password for you:

Password: ${tempPassword}

Please return to the login portal and use this 
password. You are advised to change this in your 
Settings immediately.

Regards,
AKI Security Infrastructure
==================================================
`;

    if (transporter) {
        try {
            await transporter.sendMail({
                from: `"AKI Commerce" <${smtpUser}>`,
                to: email,
                subject: "Your New Secure Password - AKI Commerce",
                text: emailBody,
            });
            console.log(`[Email Sent] Password recovery sent to ${email}`);
        } catch (mailError) {
            console.error(`[Email Failed] Failed to send to ${email}`, mailError);
            console.log(emailBody); // Fallback to console
        }
    } else {
        // Fallback: Simulated platform-styled dispatch email
        console.log(emailBody);
    }

    return { success: true };
}
