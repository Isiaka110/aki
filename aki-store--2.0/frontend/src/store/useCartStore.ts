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
  storeName: string;
  setStoreName: (name: string) => void;
  storeId: string;
  setStoreId: (id: string) => void;
  slug: string;
  setSlug: (slug: string) => void;
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
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  paystackPublicKey: string;
  setPaystackPublicKey: (key: string) => void;
  paystackSecretKey: string;
  setPaystackSecretKey: (key: string) => void;
  logo: string;
  setLogo: (url: string) => void;
  bannerUrl: string;
  setBannerUrl: (url: string) => void;
  hydrateSettings: (settings: Partial<StoreSettings>) => void;
}

export const useStoreSettings = create<StoreSettings>()(
  persist(
    (set) => ({
      storeName: 'AKI Store',
      setStoreName: (name) => set({ storeName: name }),
      storeId: '',
      setStoreId: (id) => set({ storeId: id }),
      slug: '',
      setSlug: (slug) => set({ slug }),
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
      primaryColor: '#000000',
      setPrimaryColor: (color) => set({ primaryColor: color }),
      paystackPublicKey: '',
      setPaystackPublicKey: (key) => set({ paystackPublicKey: key }),
      paystackSecretKey: '',
      setPaystackSecretKey: (key) => set({ paystackSecretKey: key }),
      logo: '',
      setLogo: (url) => set({ logo: url }),
      bannerUrl: '',
      setBannerUrl: (url) => set({ bannerUrl: url }),
      hydrateSettings: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'aki-store-settings',
    }
  )
);