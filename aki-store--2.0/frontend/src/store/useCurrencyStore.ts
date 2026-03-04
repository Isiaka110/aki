import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Fixed exchange rates for demonstration purposes based on NGN local prices
const exchangeRates: Record<string, number> = {
    NGN: 1,
    USD: 1 / 1500,
    EUR: 1 / 1600,
    GBP: 1 / 1900,
};

const currencySymbols: Record<string, string> = {
    NGN: '₦',
    USD: '$',
    EUR: '€',
    GBP: '£',
};

interface CurrencyStore {
    currency: string;
    setCurrency: (currency: string) => void;
    formatPrice: (priceInNGN: number) => string;
    convertPrice: (priceInNGN: number) => number;
}

export const useCurrencyStore = create<CurrencyStore>()(
    persist(
        (set, get) => ({
            currency: 'USD', // Default to globally acceptable USD
            setCurrency: (currency: string) => set({ currency }),
            convertPrice: (priceInNGN: number) => {
                const { currency } = get();
                const rate = exchangeRates[currency] || exchangeRates['USD'];
                return priceInNGN * rate;
            },
            formatPrice: (priceInNGN: number) => {
                const { currency, convertPrice } = get();
                const symbol = currencySymbols[currency] || '$';
                const converted = convertPrice(priceInNGN);
                return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            },
        }),
        {
            name: 'aki-currency-store',
        }
    )
);
