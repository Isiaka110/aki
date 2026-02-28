import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  images?: string[];
  quantity: number;
}

export interface OrderData {
  id: string;
  items: CartItem[];
  total: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  quickViewProduct: CartItem | null;
  lastOrder: OrderData | null;
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  setQuickView: (product: CartItem | null) => void;
  setLastOrder: (order: OrderData | null) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  quickViewProduct: null,
  lastOrder: null,

  // UI Actions
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setQuickView: (product) => set({ quickViewProduct: product }),
  setLastOrder: (order) => set({ lastOrder: order }),

  // Cart Actions
  addItem: (newItem) => set((state) => {
    const existingItem = state.items.find((item) => item.id === newItem.id);
    if (existingItem) {
      return {
        items: state.items.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
        isOpen: true, // Auto-open drawer when adding
      };
    }
    return { items: [...state.items, { ...newItem, quantity: 1 }], isOpen: true };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));

interface StoreSettings {
  whatsappNumber: string;
  setWhatsappNumber: (number: string) => void;
  ownerName: string;
  setOwnerName: (name: string) => void;
  manifesto: string;
  setManifesto: (text: string) => void;
  designation: string;
  setDesignation: (name: string) => void;
  contactEmail: string;
  setContactEmail: (email: string) => void;
  socialInstagram: string;
  setSocialInstagram: (handle: string) => void;
  socialTwitter: string;
  setSocialTwitter: (handle: string) => void;
}

export const useStoreSettings = create<StoreSettings>()(
  persist(
    (set) => ({
      whatsappNumber: '1234567890',
      setWhatsappNumber: (number) => set({ whatsappNumber: number }),
      ownerName: 'AKI Admin',
      setOwnerName: (name) => set({ ownerName: name }),
      manifesto: 'Premium fashion for the modern aesthetic.',
      setManifesto: (text) => set({ manifesto: text }),
      designation: 'AKI',
      setDesignation: (name) => set({ designation: name }),
      contactEmail: 'contact@aki.com',
      setContactEmail: (email) => set({ contactEmail: email }),
      socialInstagram: '@aki_commerce',
      setSocialInstagram: (handle) => set({ socialInstagram: handle }),
      socialTwitter: '@aki_commerce',
      setSocialTwitter: (handle) => set({ socialTwitter: handle }),
    }),
    {
      name: 'aki-store-settings',
    }
  )
);