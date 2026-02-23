// app/(storefront)/layout.tsx
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* We keep the Navbar and Cart for the shopper, but omit the global Footer */}
      <Navbar />
      <CartDrawer />
      <main className="flex-1">
        {children}
      </main>
      {/* Optional: You could create a specific <StoreFooter /> here later! */}
    </div>
  );
}