import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
import QuickViewModal from "../components/QuickViewModal";
import StoreFooter from "../components/StoreFooter";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <CartDrawer />
      <QuickViewModal />
      <main className="flex-1">
        {children}
      </main>
      <StoreFooter />
    </div>
  );
}