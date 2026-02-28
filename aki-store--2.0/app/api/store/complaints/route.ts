import { NextResponse } from "next/server";
import { dispatchComplaint } from "../../../../services/complaint.service";

/**
 * REST API for Buyers to file a secure report against a specific storefront.
 * Triggers from the storefront footer modal and injects into the Super Admin queue.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { storeId, customerEmail, issueType, description } = body;

        // Basic validation
        if (!storeId || !customerEmail || !issueType || !description) {
            return NextResponse.json(
                { success: false, error: "Missing required dispute evidence" },
                { status: 400 }
            );
        }

        // Generate a localized tracking ID
        const complaintId = `CPL-${Math.floor(Math.random() * 90000) + 10000}`;

        const newDispute = await dispatchComplaint({
            complaintId,
            storeId,
            customerEmail,
            issueType,
            description
        });

        return NextResponse.json({ success: true, data: newDispute }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
