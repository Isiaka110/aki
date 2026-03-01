import { NextResponse } from "next/server";
import { getAllComplaints, updateComplaintStatus } from "../../../../services/complaint.service";

/**
 * REST API for Super Admin to fetch all active platform-wide disputes
 */
export async function GET() {
    try {
        const complaints = await getAllComplaints();
        return NextResponse.json({ success: true, data: complaints }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

/**
 * REST API for Super Admin to escalate or resolve a dispute
 */
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { complaintId, status, severity } = body;

        if (!complaintId || (!status && !severity)) {
            return NextResponse.json(
                { success: false, error: "Missing required dispute parameters" },
                { status: 400 }
            );
        }

        const updatedDispute = await updateComplaintStatus(complaintId, status, severity);

        return NextResponse.json({ success: true, data: updatedDispute }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
