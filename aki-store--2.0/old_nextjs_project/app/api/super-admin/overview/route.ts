import { NextResponse } from "next/server";
import { getAllStores } from "../../../../services/store.service";
import { getAllComplaints } from "../../../../services/complaint.service";

export async function GET() {
    try {
        const stores = await getAllStores();
        const complaints = await getAllComplaints();

        const activeStores = stores.filter(s => s.status === 'Active').length;
        const pendingApprovals = stores.filter(s => s.status === 'Pending').length;
        const openComplaints = complaints.filter(c => c.status === 'Open').length;
        const totalRevenue = stores.reduce((acc, store) => acc + (store.revenue || 0), 0);

        return NextResponse.json({
            success: true,
            data: {
                activeStores,
                pendingApprovals,
                openComplaints,
                totalRevenue
            }
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
