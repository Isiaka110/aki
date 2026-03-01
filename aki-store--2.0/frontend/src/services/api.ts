
// Central API service connecting the Vite frontend to the Express backend
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function apiRequest<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
        throw new Error(data.error || `Request failed (${res.status})`);
    }
    return data.data ?? data;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function apiLogin(email: string, password: string, role?: string) {
    return apiRequest<{ user: any; token: string }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
    });
}

export async function apiRegister(payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    storeName: string;
}) {
    return apiRequest<void>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export async function apiLogout() {
    return apiRequest<void>('/api/auth/logout', { method: 'POST' });
}

// ─── Super Admin ─────────────────────────────────────────────────────────────

export async function apiGetSuperAdminOverview() {
    return apiRequest<{
        activeStores: number;
        pendingApprovals: number;
        openComplaints: number;
        totalRevenue: number;
    }>('/api/super-admin/overview');
}

export async function apiGetAllStores() {
    return apiRequest<any[]>('/api/super-admin/stores');
}

export async function apiUpdateStoreIntegrity(payload: {
    storeId: string;
    status: string;
    riskScore?: string;
}) {
    return apiRequest<any>('/api/super-admin/stores', {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}

export async function apiGetComplaints() {
    return apiRequest<any[]>('/api/super-admin/complaints');
}

export async function apiUpdateComplaint(payload: {
    complaintId: string;
    status: string;
    severity?: string;
}) {
    return apiRequest<any>('/api/super-admin/complaints', {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}

// ─── Store (Customer-facing) ──────────────────────────────────────────────────

export async function apiSubmitComplaint(payload: {
    storeId: string;
    customerEmail: string;
    issueType: string;
    description: string;
}) {
    return apiRequest<any>('/api/store/complaints', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}
