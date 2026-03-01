import mongoose from "mongoose";
import connectToDatabase from "../lib/mongodb";
import Product from "../models/Product";
import Store from "../models/Store";

export async function getStoreProducts(storeRef: string) {
    await connectToDatabase();
    // Resolve storeId if a slug/storeId string is passed instead of _id
    let resolvedId = storeRef;
    if (!mongoose.Types.ObjectId.isValid(storeRef)) {
        const store = await Store.findOne({ storeId: storeRef });
        if (store) resolvedId = store._id.toString();
    }
    return await Product.find({ storeId: resolvedId }).sort({ createdAt: -1 });
}

export async function createProduct(storeId: string, payload: any) {
    await connectToDatabase();

    // Validate store exists
    const store = await Store.findById(storeId);
    if (!store) throw new Error("Store not found");

    const productId = `PRD-${Math.floor(Math.random() * 900000) + 100000}`;

    const newProduct = await Product.create({
        ...payload,
        productId,
        storeId: store._id.toString()
    });

    return newProduct;
}

export async function updateProduct(storeId: string, productId: string, payload: any) {
    await connectToDatabase();
    const store = await Store.findById(storeId);
    if (!store) throw new Error("Store not found");

    const product = await Product.findOneAndUpdate(
        { productId, storeId: store._id.toString() },
        { $set: payload },
        { new: true }
    );

    if (!product) throw new Error("Product not found or unauthorized");
    return product;
}

export async function deleteProduct(storeId: string, productId: string) {
    await connectToDatabase();
    const store = await Store.findById(storeId);
    if (!store) throw new Error("Store not found");

    const result = await Product.findOneAndDelete({ productId, storeId: store._id.toString() });
    if (!result) throw new Error("Product not found or unauthorized");
    return result;
}
