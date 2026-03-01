import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    productId: string;
    storeId: string;
    title: string;
    category: string;
    description?: string;
    price: number;
    stock: number;
    status: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
    productId: { type: String, required: true, unique: true },
    storeId: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    status: { type: String, required: true, enum: ['Active', 'Draft', 'Archived'], default: 'Active' },
    images: { type: [String], default: [] }
}, {
    timestamps: true
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
