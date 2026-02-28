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
    return await Store.findOne({ storeId });
}

/**
 * Updates the status and risk profile of a target store.
 * Primarily utilized by the Super Admin integrity checks.
 */
export async function updateStoreIntegrity(storeId: string, status: string, riskScore?: string) {
    await connectToDatabase();

    const updatePayload: any = { status };
    if (riskScore) {
        updatePayload.riskScore = riskScore;
    }

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
