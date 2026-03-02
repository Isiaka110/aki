import mongoose, { Schema, Document, models } from "mongoose";

export interface IStore extends Document {
    storeId: string;
    slug: string;
    name: string;
    ownerName: string;
    email: string;
    adminId: mongoose.Types.ObjectId;
    status: "Active" | "Pending" | "Flagged" | "Suspended";
    riskScore: "Low" | "Medium" | "Critical";
    revenue: number;
    designation?: string;
    manifesto?: string;
    whatsappNumber?: string;
    socialInstagram?: string;
    socialTwitter?: string;
    supportEmail?: string;
    primaryColor?: string;
    paystackPublicKey?: string;
    paystackSecretKey?: string;
    logo?: string;
    bannerUrl?: string;
    isFeatured?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const StoreSchema = new Schema<IStore>(
    {
        storeId: { type: String, required: true, unique: true, index: true },
        slug: { type: String, required: true, unique: true, index: true },
        name: { type: String, required: true, index: true },
        ownerName: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        adminId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: { type: String, enum: ["Active", "Pending", "Flagged", "Suspended"], default: "Pending" },
        riskScore: { type: String, enum: ["Low", "Medium", "Critical"], default: "Low" },
        revenue: { type: Number, default: 0 },
        designation: { type: String, default: "" },
        manifesto: { type: String, default: "" },
        whatsappNumber: { type: String, default: "" },
        socialInstagram: { type: String, default: "" },
        socialTwitter: { type: String, default: "" },
        supportEmail: { type: String, default: "" },
        primaryColor: { type: String, default: "#000000" },
        paystackPublicKey: { type: String, default: "" },
        paystackSecretKey: { type: String, default: "" },
        logo: { type: String, default: "" },
        bannerUrl: { type: String, default: "" },
        isFeatured: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const Store = models.Store || mongoose.model<IStore>("Store", StoreSchema);

export default Store;
