import mongoose, { Schema, Document, models } from "mongoose";

export interface IStore extends Document {
    storeId: string;
    name: string;
    ownerName: string;
    email: string;
    adminId: mongoose.Types.ObjectId;
    status: "Active" | "Pending" | "Flagged" | "Suspended";
    riskScore: "Low" | "Medium" | "Critical";
    revenue: number;
    createdAt: Date;
    updatedAt: Date;
}

const StoreSchema = new Schema<IStore>(
    {
        storeId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        ownerName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        adminId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: { type: String, enum: ["Active", "Pending", "Flagged", "Suspended"], default: "Pending" },
        riskScore: { type: String, enum: ["Low", "Medium", "Critical"], default: "Low" },
        revenue: { type: Number, default: 0 }
    },
    { timestamps: true }
);

const Store = models.Store || mongoose.model<IStore>("Store", StoreSchema);

export default Store;
