import connectToDatabase from "../lib/mongodb";
import Complaint from "../models/Complaint";

/**
 * Retrieves all global platform complaints.
 * Enables the Super Admin to oversee disputes spanning all vendors.
 */
export async function getAllComplaints() {
    await connectToDatabase();
    return await Complaint.find({}).sort({ createdAt: -1 });
}

/**
 * Creates a new dispute/complaint from a buyer against a specific store.
 */
export async function dispatchComplaint(payload: {
    complaintId: string;
    storeId: string;
    customerEmail: string;
    issueType: string;
    description: string;
}) {
    await connectToDatabase();
    return await Complaint.create(payload);
}

/**
 * Updates the severity or processing status of an active complaint.
 */
export async function updateComplaintStatus(
    complaintId: string,
    status?: string,
    severity?: string
) {
    await connectToDatabase();

    const updatePayload: any = {};
    if (status) updatePayload.status = status;
    if (severity) updatePayload.severity = severity;

    return await Complaint.findOneAndUpdate(
        { complaintId },
        updatePayload,
        { new: true }
    );
}
