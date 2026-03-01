import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
    productId: string;
    title: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface IOrder extends Document {
    storeId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    items: IOrderItem[];
    totalAmount: number;
    status: 'Pending' | 'Active' | 'Shipped' | 'Delivered' | 'Cancelled';
    paymentStatus: 'Pending' | 'Completed' | 'Failed';
    paymentReference?: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
    storeId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: false },
    customerAddress: { type: String, required: true },
    items: [
        {
            productId: { type: String, required: true },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 },
            image: { type: String },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Active', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    paymentReference: { type: String },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
