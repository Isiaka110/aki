import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
    email: string;
    passwordHash: string;
    role: "super-admin" | "store-admin" | "customer";
    firstName?: string;
    lastName?: string;
    storeId?: mongoose.Types.ObjectId; // Only populated if role === store-admin
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        role: { type: String, enum: ["super-admin", "store-admin", "customer"], default: "customer" },
        firstName: { type: String },
        lastName: { type: String },
        storeId: { type: Schema.Types.ObjectId, ref: "Store" }
    },
    { timestamps: true }
);

const User = models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
