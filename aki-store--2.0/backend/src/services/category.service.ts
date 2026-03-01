import mongoose from "mongoose";
import connectToDatabase from "../lib/mongodb";
import Category from "../models/Category";
import Store from "../models/Store";
import Product from "../models/Product";

export async function getStoreCategories(storeRef: string) {
    await connectToDatabase();

    // Resolve storeId if a slug/id string is passed
    let resolvedId = storeRef;
    if (!mongoose.Types.ObjectId.isValid(storeRef)) {
        const store = await Store.findOne({ storeId: storeRef });
        if (store) resolvedId = store._id.toString();
    }

    // Fetch categories and cross-reference with products for counts
    const categories = await Category.find({ storeId: resolvedId }).sort({ createdAt: -1 }).lean();

    const categoriesWithCount = await Promise.all(categories.map(async (cat) => {
        const count = await Product.countDocuments({ storeId: resolvedId, category: cat.name });
        return {
            ...cat,
            id: (cat as any)._id.toString(),
            productCount: count
        };
    }));

    return categoriesWithCount;
}

export async function createCategory(storeId: string, payload: any) {
    await connectToDatabase();

    const store = await Store.findById(storeId);
    if (!store) throw new Error("Store not found");

    const newCategory = await Category.create({
        ...payload,
        storeId: store._id.toString()
    });

    return {
        ...newCategory.toObject(),
        id: newCategory._id.toString(),
        productCount: 0
    };
}

export async function updateCategory(storeId: string, categoryId: string, payload: any) {
    await connectToDatabase();
    const store = await Store.findById(storeId);
    if (!store) throw new Error("Store not found");

    const category = await Category.findOneAndUpdate(
        { _id: categoryId, storeId: store._id.toString() },
        { $set: payload },
        { new: true }
    );

    if (!category) throw new Error("Category not found or unauthorized");

    const count = await Product.countDocuments({ storeId, category: category.name });

    return {
        ...category.toObject(),
        id: category._id.toString(),
        productCount: count
    };
}

export async function deleteCategory(storeId: string, categoryId: string) {
    await connectToDatabase();
    const store = await Store.findById(storeId);
    if (!store) throw new Error("Store not found");

    const result = await Category.findOneAndDelete({ _id: categoryId, storeId: store._id.toString() });
    if (!result) throw new Error("Category not found or unauthorized");
    return result;
}
