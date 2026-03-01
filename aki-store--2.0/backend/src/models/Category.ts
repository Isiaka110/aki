import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    storeId: string;
    name: string;
    description?: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema: Schema = new Schema({
    storeId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['Active', 'Draft', 'Archived'], default: 'Active' },
}, {
    timestamps: true
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
