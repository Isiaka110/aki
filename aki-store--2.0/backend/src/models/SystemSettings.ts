import mongoose, { Schema, Document, models } from "mongoose";

export interface ISystemSettings extends Document {
    noticeBanner: string;
    createdAt: Date;
    updatedAt: Date;
}

const SystemSettingsSchema = new Schema<ISystemSettings>(
    {
        noticeBanner: { type: String, default: "" },
    },
    { timestamps: true }
);

const SystemSettings = models.SystemSettings || mongoose.model<ISystemSettings>("SystemSettings", SystemSettingsSchema);

export default SystemSettings;
