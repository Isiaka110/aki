import connectToDatabase from "../lib/mongodb";
import Store from "../models/Store";

/**
 * Retrieves all stores on the platform, sorted by newest first.
 */
export async function getAllStores() {
    await connectToDatabase();
    return await Store.find({}).sort({ createdAt: -1 });
}

/**
 * Retrieves a single store by its unique store ID.
 */
export async function getStoreById(storeId: string) {
    await connectToDatabase();
    // Try the custom storeId (STR-xxxx), the slug (like 'official'), and the MongoDB _id
    const store = await Store.findOne({
        $or: [
            { storeId: storeId },
            { slug: storeId }
        ]
    });
    if (store) return store;

    // If storeId is a valid ObjectId, try finding by _id
    if (storeId.match(/^[0-9a-fA-F]{24}$/)) {
        return await Store.findById(storeId);
    }
    return null;
}

/**
 * Updates the status and risk profile of a target store.
 * Primarily utilized by the Super Admin integrity checks.
 */
export async function updateStoreIntegrity(storeId: string, status: string, riskScore?: string, isFeatured?: boolean) {
    await connectToDatabase();

    const updatePayload: any = { status };
    if (riskScore) {
        updatePayload.riskScore = riskScore;
    }
    if (isFeatured !== undefined) {
        updatePayload.isFeatured = isFeatured;
    }

    // Try finding by internal ID first (Super Admin dashboard often passes _id)
    if (storeId.match(/^[0-9a-fA-F]{24}$/)) {
        return await Store.findByIdAndUpdate(storeId, updatePayload, { new: true });
    }

    // Fallback to custom storeId (slug)
    return await Store.findOneAndUpdate(
        { storeId },
        updatePayload,
        { new: true }
    );
}

/**
 * Registers a new prospective store onto the platform.
 */
export async function createStore(payload: { storeId: string, name: string, ownerName: string, email: string }) {
    await connectToDatabase();
    return await Store.create(payload);
}

/**
 * Updates the store administration settings (branding, theme, etc)
 */
export async function updateStoreSettings(storeId: string, payload: any) {
    await connectToDatabase();

    if (payload.name) {
        const newSlug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const existingStore = await Store.findOne({ slug: newSlug, _id: { $ne: storeId } });
        if (existingStore) throw new Error("This Store Name is already taken. Please choose another.");
        payload.slug = newSlug;
    }

    return await Store.findByIdAndUpdate(
        storeId,
        payload,
        { new: true }
    );
}

export async function verifyStoreRegistration(adminStoreId: string, payload: { status: "Verified" | "Rejected" }) {
    await connectToDatabase();
    // adminStoreId here means the store being verified

    const store = await Store.findByIdAndUpdate(
        adminStoreId,
        { verificationStatus: payload.status, status: payload.status === "Verified" ? "Active" : "Rejected" },
        { new: true }
    );

    if (store && payload.status === "Verified") {
        console.log(`[AKI EMAIL MOCK] Sending verification email to ${store.email} for store ${store.name}`);
    }
    return store;
}
