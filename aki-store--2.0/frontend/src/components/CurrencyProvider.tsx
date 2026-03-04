/**
 * CurrencyProvider
 * Mounts once at app root and triggers a live exchange rate fetch.
 * Uses 30-min cache so it doesn't hammer the API on every navigation.
 */
import { useEffect } from 'react';
import { useCurrencyStore } from '../store/useCurrencyStore';

export default function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const fetchLiveRates = useCurrencyStore((s) => s.fetchLiveRates);

    useEffect(() => {
        fetchLiveRates();
        // Also refresh when tab becomes visible again after being hidden
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') fetchLiveRates();
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, [fetchLiveRates]);

    return <>{children}</>;
}
