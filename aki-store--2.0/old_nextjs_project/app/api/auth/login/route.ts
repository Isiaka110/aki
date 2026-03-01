import { NextResponse } from "next/server";
import { loginUser } from "../../../../services/auth.service";

/**
 * REST API to securely login either a Super Admin or a Store Admin.
 * Handles the JWT creation and injects it into an HTTP-only secure cookie
 * so the frontend doesn't have to manually carry it around.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, role } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: "Please provide credentials." },
                { status: 400 }
            );
        }

        const data = await loginUser(email, password, role);

        // Build the precise strict cookie response
        const response = NextResponse.json(
            { success: true, user: data.user },
            { status: 200 }
        );

        response.cookies.set({
            name: "aki_ecommerce_session",
            value: data.token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 1, // 1 Day
            path: "/"
        });

        return response;
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 401 }
        );
    }
}
