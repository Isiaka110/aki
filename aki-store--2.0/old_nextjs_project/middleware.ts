import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || "fallback_core_secret_key_123!";
const key = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
    const p = request.nextUrl.pathname;

    // We protect certain routes
    const isSuperAdminRoute = p.startsWith('/super-admin');
    const isStoreAdminRoute = p.startsWith('/store-admin');
    const isAuthRoute = p.startsWith('/auth/login') || p.startsWith('/auth/super-login');

    const token = request.cookies.get('aki_ecommerce_session')?.value;

    if (isSuperAdminRoute || isStoreAdminRoute) {
        if (!token) {
            // Redirect to appropriate login page if unauthenticated
            const loginUrl = new URL(isSuperAdminRoute ? '/auth/super-login' : '/auth/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        try {
            const { payload } = await jwtVerify(token, key);

            // Verify roles
            if (isSuperAdminRoute && payload.role !== 'super-admin') {
                return NextResponse.redirect(new URL('/auth/login', request.url));
            }

            if (isStoreAdminRoute && payload.role !== 'store-admin' && payload.role !== 'super-admin') {
                return NextResponse.redirect(new URL('/auth/super-login', request.url));
            }

            return NextResponse.next();
        } catch (error) {
            // Token is invalid/expired
            const loginUrl = new URL(isSuperAdminRoute ? '/auth/super-login' : '/auth/login', request.url);
            const response = NextResponse.redirect(loginUrl);
            response.cookies.delete('aki_ecommerce_session');
            return response;
        }
    }

    if (isAuthRoute && token) {
        // If they have a valid token, redirect them to their respective dashboard instead of login screen
        try {
            const { payload } = await jwtVerify(token, key);
            if (payload.role === 'super-admin') {
                return NextResponse.redirect(new URL('/super-admin', request.url));
            } else if (payload.role === 'store-admin') {
                return NextResponse.redirect(new URL('/store-admin', request.url));
            }
        } catch (e) {
            // Let the auth page render if parsing fails
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/super-admin/:path*', '/store-admin/:path*', '/auth/login', '/auth/super-login'],
};
