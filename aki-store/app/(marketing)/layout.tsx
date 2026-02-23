// app/(marketing)/layout.tsx
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
import CartDrawer from "../../app/components/CartDrawer";
import QuickViewModal from "../../app/components/QuickViewModal";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <CartDrawer />
      <QuickViewModal />
      <main className="flex-1">
        {children}
      </main>
      <Footer /> {/* The footer is now ONLY on the landing page and marketing links */}
    </div>
  );
}