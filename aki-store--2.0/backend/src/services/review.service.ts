import connectToDatabase from "../lib/mongodb";
import Review from "../models/Review";

/**
 * Creates a new review for a store.
 */
export async function createReview(payload: {
    storeId: string;
    customerName: string;
    productName: string;
    rating: number;
    comment: string;
}) {
    await connectToDatabase();
    return await Review.create(payload);
}

/**
 * Retrieves all reviews for a store.
 */
export async function getStoreReviews(storeId: string, filter: any = {}) {
    await connectToDatabase();
    return await Review.find({ storeId, ...filter }).sort({ createdAt: -1 });
}

/**
 * Updates a review's status (Moderate).
 */
export async function updateReviewStatus(reviewId: string, status: "Approved" | "Pending" | "Rejected") {
    await connectToDatabase();
    return await Review.findByIdAndUpdate(reviewId, { status }, { new: true });
}
