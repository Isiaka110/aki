import { NextResponse } from "next/server";
import { getAllStores, updateStoreIntegrity } from "../../../../services/store.service";

/**
 * REST API for Super Admin to fetch all store integrity data
 */
export async function GET() {
    try {
        const stores = await getAllStores();
        return NextResponse.json({ success: true, data: stores }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

/**
 * REST API for Super Admin to Ban or Approve specific stores
 */
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { storeId, status, riskScore } = body;

        if (!storeId || !status) {
            return NextResponse.json(
                { success: false, error: "Missing required integrity parameters" },
                { status: 400 }
            );
        }

        const updatedStore = await updateStoreIntegrity(storeId, status, riskScore);

        return NextResponse.json({ success: true, data: updatedStore }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
