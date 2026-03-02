
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
    return apiRequest<{ user: any; token: string }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

// ─── Store Admin ─────────────────────────────────────────────────────────────

export async function apiGetStoreAdminOverview() {
    return apiRequest<{
        storeName: string;
        storeId: string;
        slug: string;
        totalRevenue: number;
        activeOrders: number;
        totalProducts: number;
        storeViews: number;
        status: string;
        recentOrders: any[];
        settings?: {
            designation: string;
            manifesto: string;
            whatsappNumber: string;
            socialInstagram: string;
            socialTwitter: string;
            supportEmail: string;
            primaryColor: string;
            logo: string;
            bannerUrl: string;
        };
    }>('/api/store-admin/overview');
}

export async function apiUpdateStoreSettings(payload: any) {
    return apiRequest<any>('/api/store-admin/settings', {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}

export async function apiGetProducts() {
    return apiRequest<any[]>('/api/store-admin/products');
}

export async function apiCreateProduct(payload: any) {
    return apiRequest<any>('/api/store-admin/products', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export async function apiUpdateProduct(productId: string, payload: any) {
    return apiRequest<any>(`/api/store-admin/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}

export async function apiDeleteProduct(productId: string) {
    return apiRequest<void>(`/api/store-admin/products/${productId}`, {
        method: 'DELETE',
    });
}

export async function apiGetCategories() {
    return apiRequest<any[]>('/api/store-admin/categories');
}

export async function apiCreateCategory(payload: { name: string, description?: string }) {
    return apiRequest<any>('/api/store-admin/categories', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export async function apiUpdateCategory(categoryId: string, payload: { name: string, description?: string }) {
    return apiRequest<any>(`/api/store-admin/categories/${categoryId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}

export async function apiDeleteCategory(categoryId: string) {
    return apiRequest<void>(`/api/store-admin/categories/${categoryId}`, {
        method: 'DELETE',
    });
}

export async function apiLogout() {
    return apiRequest<void>('/api/auth/logout', { method: 'POST' });
}

export async function apiGetReviews() {
    return apiRequest<any[]>('/api/store-admin/reviews');
}

export async function apiUpdateReviewStatus(reviewId: string, status: string) {
    return apiRequest<any>(`/api/store-admin/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
    });
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function apiGetStoreOrders() {
    return apiRequest<any[]>('/api/store-admin/orders');
}

export async function apiUpdateOrderStatusAdmin(orderId: string, status: string) {
    return apiRequest<any>(`/api/store-admin/orders/${orderId}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
    });
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
    isFeatured?: boolean;
    reason?: string;
}) {
    return apiRequest<any>('/api/super-admin/stores', {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}

export async function apiGetSuperAdminStoreProducts(storeId: string) {
    return apiRequest<any[]>(`/api/super-admin/stores/${storeId}/products`);
}

export async function apiGetSuperAdminStoreCategories(storeId: string) {
    return apiRequest<any[]>(`/api/super-admin/stores/${storeId}/categories`);
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

export async function apiSubmitReview(payload: {
    storeId: string;
    customerName: string;
    productName: string;
    rating: number;
    comment: string;
}) {
    return apiRequest<any>('/api/store/reviews', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

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

export async function apiGetStoreBySlug(slug: string) {
    return apiRequest<any>(`/api/store/${slug}`);
}

export async function apiGetFeaturedStores() {
    const res = await apiRequest<any>('/api/stores/featured');
    return res.data || [];
}
