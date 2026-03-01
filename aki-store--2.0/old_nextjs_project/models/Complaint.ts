import mongoose, { Schema, Document, models } from "mongoose";

export interface IComplaint extends Document {
    complaintId: string;
    storeId: string;
    customerEmail: string;
    issueType: string;
    description: string;
    severity: "Low" | "Medium" | "High" | "Critical";
    status: "Open" | "Investigating" | "Escalated" | "Resolved";
    createdAt: Date;
    updatedAt: Date;
}

const ComplaintSchema = new Schema<IComplaint>(
    {
        complaintId: { type: String, required: true, unique: true },
        storeId: { type: String, required: true },
        customerEmail: { type: String, required: true },
        issueType: { type: String, required: true },
        description: { type: String, required: true },
        severity: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
        status: { type: String, enum: ["Open", "Investigating", "Escalated", "Resolved"], default: "Open" }
    },
    { timestamps: true }
);

const Complaint = models.Complaint || mongoose.model<IComplaint>("Complaint", ComplaintSchema);

export default Complaint;
