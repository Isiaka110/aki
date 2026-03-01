
// Marketing layout: wraps public-facing pages (landing, about, contact, etc.)
// with the shared Navbar and Footer.
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CartDrawer from '../../components/CartDrawer';
import QuickViewModal from '../../components/QuickViewModal';

export default function MarketingLayout() {
    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
            <CartDrawer />
            <QuickViewModal />
        </div>
    );
}
