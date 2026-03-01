import mongoose, { Schema, Document, models } from "mongoose";

export interface IReview extends Document {
    storeId: mongoose.Types.ObjectId | string;
    customerName: string;
    productName: string;
    rating: number;
    comment: string;
    status: "Approved" | "Pending" | "Rejected";
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
    {
        storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true },
        customerName: { type: String, required: true },
        productName: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        status: { type: String, enum: ["Approved", "Pending", "Rejected"], default: "Pending" },
        date: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

const Review = models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
