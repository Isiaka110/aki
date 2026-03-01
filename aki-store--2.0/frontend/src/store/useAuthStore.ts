
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'store_admin' | 'super_admin';
    storeName?: string;
}

interface AuthStore {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (user: AuthUser, token: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            setAuth: (user, token) =>
                set({ user, token, isAuthenticated: true }),

            clearAuth: () =>
                set({ user: null, token: null, isAuthenticated: false }),
        }),
        { name: 'aki-auth' }
    )
);
