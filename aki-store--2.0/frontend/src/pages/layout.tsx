import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import StoreFooter from "../components/StoreFooter";
import CartDrawer from "../components/CartDrawer";
import QuickViewModal from "../components/QuickViewModal";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc] text-gray-900 dark:bg-[#050505] dark:text-gray-100 transition-colors duration-300 font-sans">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <StoreFooter />
      <CartDrawer />
      <QuickViewModal />
    </div>
  );
}