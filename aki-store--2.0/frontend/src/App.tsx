
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import MarketingLayout from './pages/marketing/layout';
import StorefrontLayout from './pages/layout';
import StoreAdminLayout from './pages/store-admin/layout';
import SuperAdminLayout from './pages/super-admin/layout';

// Marketing Pages
import LandingPage from './pages/page';
import AboutPage from './pages/about/page';
import ContactPage from './pages/contact/page';
import PrivacyPage from './pages/privacy/page';
import TermsPage from './pages/terms/page';

// Storefront Pages
import ExplorePage from './pages/explore/page';
import StorePage from './pages/[storeSlug]/page';

// Auth
import LoginPage from './pages/auth/login/page';
import SuperLoginPage from './pages/auth/super-login/page';
import SignupPage from './pages/auth/signup/page';

// Onboarding
import OnboardingPage from './pages/onboarding/page';

// Store Admin
import StoreAdminHome from './pages/store-admin/page';
import StoreAdminProducts from './pages/store-admin/products/page';
import StoreAdminOrders from './pages/store-admin/orders/page';
import StoreAdminCategories from './pages/store-admin/categories/page';
import StoreAdminReviews from './pages/store-admin/reviews/page';
import StoreAdminSettings from './pages/store-admin/settings/page';

// Super Admin
import SuperAdminHome from './pages/super-admin/page';
import SuperAdminStores from './pages/super-admin/stores/page';
import SuperAdminComplaints from './pages/super-admin/complaints/page';
import SuperAdminSettings from './pages/super-admin/settings/page';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Marketing (with Navbar + Footer) ────────────────────────── */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Route>

        {/* ── Auth (standalone, no outer nav) ──────────────────────────── */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/super-login" element={<SuperLoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* ── Super Admin ───────────────────────────────────────────────── */}
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminHome />} />
          <Route path="stores" element={<SuperAdminStores />} />
          <Route path="complaints" element={<SuperAdminComplaints />} />
          <Route path="settings" element={<SuperAdminSettings />} />
        </Route>

        {/* ── Store Admin ───────────────────────────────────────────────── */}
        <Route path="/store-admin" element={<StoreAdminLayout />}>
          <Route index element={<StoreAdminHome />} />
          <Route path="products" element={<StoreAdminProducts />} />
          <Route path="orders" element={<StoreAdminOrders />} />
          <Route path="categories" element={<StoreAdminCategories />} />
          <Route path="reviews" element={<StoreAdminReviews />} />
          <Route path="settings" element={<StoreAdminSettings />} />
        </Route>

        {/* ── Storefront (store-specific pages with Navbar) ─────────────── */}
        <Route element={<StorefrontLayout />}>
          <Route path="/:storeSlug" element={<StorePage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
