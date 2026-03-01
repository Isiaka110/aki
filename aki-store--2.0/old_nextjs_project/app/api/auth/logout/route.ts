import { NextResponse } from "next/server";

/**
 * REST API to quickly, universally and securely erase sessions across the platform.
 */
export async function POST() {
    try {
        const response = NextResponse.json(
            { success: true, message: "Logged out successfully." },
            { status: 200 }
        );

        response.cookies.delete("aki_ecommerce_session");

        return response;
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: "Failed to erase cookies." },
            { status: 500 }
        );
    }
}
