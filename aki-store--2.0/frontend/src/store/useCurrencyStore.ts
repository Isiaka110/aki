import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Currency metadata ─────────────────────────────────────────────────────
export const CURRENCIES: Record<string, { symbol: string; label: string }> = {
    NGN: { symbol: '₦', label: 'NGN' },
    USD: { symbol: '$', label: 'USD' },
    EUR: { symbol: '€', label: 'EUR' },
    GBP: { symbol: '£', label: 'GBP' },
    CAD: { symbol: 'C$', label: 'CAD' },
    AED: { symbol: 'AED', label: 'AED' },
    ZAR: { symbol: 'R', label: 'ZAR' },
};

// ─── Fallback static rates (NGN base) in case API is unavailable ──────────
const FALLBACK_RATES: Record<string, number> = {
    NGN: 1,
    USD: 1 / 1580,
    EUR: 1 / 1700,
    GBP: 1 / 2010,
    CAD: 1 / 1160,
    AED: 1 / 430,
    ZAR: 1 / 86,
};

interface CurrencyStore {
    currency: string;
    rates: Record<string, number>;  // NGN-based rates
    ratesLastUpdated: number | null; // timestamp in ms
    isFetchingRates: boolean;

    setCurrency: (currency: string) => void;
    fetchLiveRates: () => Promise<void>;
    convertPrice: (priceInNGN: number) => number;
    formatPrice: (priceInNGN: number) => string;
}

export const useCurrencyStore = create<CurrencyStore>()(
    persist(
        (set, get) => ({
            currency: 'NGN',
            rates: FALLBACK_RATES,
            ratesLastUpdated: null,
            isFetchingRates: false,

            setCurrency: (currency: string) => set({ currency }),

            fetchLiveRates: async () => {
                // Skip if fetched in the last 30 minutes
                const { ratesLastUpdated, isFetchingRates } = get();
                const THIRTY_MIN = 30 * 60 * 1000;
                if (isFetchingRates) return;
                if (ratesLastUpdated && Date.now() - ratesLastUpdated < THIRTY_MIN) return;

                set({ isFetchingRates: true });
                try {
                    // open.er-api.com: free, no key required, ~1500 req/month
                    const res = await fetch('https://open.er-api.com/v6/latest/NGN');
                    if (!res.ok) throw new Error('Rate API unavailable');
                    const data = await res.json();

                    if (data.result === 'success' && data.rates) {
                        const liveRates: Record<string, number> = { NGN: 1 };
                        Object.keys(CURRENCIES).forEach((code) => {
                            if (data.rates[code]) {
                                liveRates[code] = data.rates[code]; // already NGN-based
                            }
                        });
                        set({ rates: liveRates, ratesLastUpdated: Date.now() });
                    }
                } catch (err) {
                    // Silently fall back to static rates — no UI disruption
                    console.warn('[Currency] Live rate fetch failed. Using fallback rates.', err);
                    set({ rates: FALLBACK_RATES });
                } finally {
                    set({ isFetchingRates: false });
                }
            },

            convertPrice: (priceInNGN: number) => {
                const { currency, rates } = get();
                const rate = rates[currency] ?? FALLBACK_RATES[currency] ?? 1;
                // rates are NGN-based (e.g. NGN→USD = 0.000633)
                return priceInNGN * rate;
            },

            formatPrice: (priceInNGN: number) => {
                const { currency } = get();
                const { convertPrice } = get();
                const symbol = CURRENCIES[currency]?.symbol ?? currency;
                const converted = convertPrice(priceInNGN);

                // Format with locale-aware number style
                const formatted = converted.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
                return `${symbol}${formatted}`;
            },
        }),
        {
            name: 'aki-currency-store',
            partialize: (state) => ({
                // Persist currency choice and rates, not fetch status
                currency: state.currency,
                rates: state.rates,
                ratesLastUpdated: state.ratesLastUpdated,
            }),
        }
    )
);
