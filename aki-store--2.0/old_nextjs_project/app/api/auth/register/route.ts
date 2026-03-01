import { NextResponse } from "next/server";
import { registerStoreAdmin } from "../../../../services/auth.service";

/**
 * REST API to register a new Store Admin.
 * This automatically creates their profile AND their personalized store, syncing them instantly.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, firstName, lastName, storeName } = body;

        // Basic payload validation
        if (!email || !password || !firstName || !lastName || !storeName) {
            return NextResponse.json(
                { success: false, error: "Please fill out all required fields" },
                { status: 400 }
            );
        }

        const data = await registerStoreAdmin({
            email,
            password,
            firstName,
            lastName,
            storeName
        });

        return NextResponse.json(
            { success: true, message: "Store registered successfully. Awaiting Super Admin approval." },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
