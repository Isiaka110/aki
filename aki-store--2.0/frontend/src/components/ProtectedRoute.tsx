
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface ProtectedRouteProps {
    /** Which role is allowed to access this section */
    requiredRole: 'store-admin' | 'super-admin';
    /** Where to send the user if they're not logged in */
    loginPath: string;
}

/**
 * Wraps a group of routes and enforces auth + role checks.
 *
 * Behaviour matrix:
 * ┌─────────────────────┬────────────────────────────────────────────┐
 * │ State               │ Action                                     │
 * ├─────────────────────┼────────────────────────────────────────────┤
 * │ Not logged in       │ → loginPath (with ?next= for redirect back)│
 * │ Wrong role          │ → their correct dashboard                  │
 * │ Correct role        │ Render <Outlet />                          │
 * └─────────────────────┴────────────────────────────────────────────┘
 */
export default function ProtectedRoute({ requiredRole, loginPath }: ProtectedRouteProps) {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();

    // 1. Not logged in at all → go to login, preserve intended URL
    if (!isAuthenticated || !user) {
        return <Navigate to={`${loginPath}?next=${encodeURIComponent(location.pathname)}`} replace />;
    }

    // 2. Logged in but wrong role → redirect to their own portal
    if (user.role !== requiredRole) {
        const correctDashboard = user.role === 'super-admin' ? '/super-admin' : '/store-admin';
        return <Navigate to={correctDashboard} replace />;
    }

    // 3. Correct role → render the protected page
    return <Outlet />;
}
