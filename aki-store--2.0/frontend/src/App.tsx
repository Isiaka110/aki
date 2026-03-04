
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Guards
import ProtectedRoute from './components/ProtectedRoute';

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
import StorefrontAccountPage from './pages/[storeSlug]/account/page';
import StorePrivacyPage from './pages/[storeSlug]/privacy/page';
import StoreTermsPage from './pages/[storeSlug]/terms/page';

// Auth
import LoginPage from './pages/auth/login/page';
import SuperLoginPage from './pages/auth/super-login/page';
import SignupPage from './pages/auth/signup/page';
import ResetPasswordPage from './pages/auth/reset-password/page';

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
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* ── Super Admin (protected: super-admin role only) ────────────── */}
        <Route element={
          <ProtectedRoute requiredRole="super-admin" loginPath="/auth/super-login" />
        }>
          <Route path="/super-admin" element={<SuperAdminLayout />}>
            <Route index element={<SuperAdminHome />} />
            <Route path="stores" element={<SuperAdminStores />} />
            <Route path="complaints" element={<SuperAdminComplaints />} />
            <Route path="settings" element={<SuperAdminSettings />} />
          </Route>
        </Route>

        {/* ── Store Admin (protected: store-admin role only) ────────────── */}
        <Route element={
          <ProtectedRoute requiredRole="store-admin" loginPath="/auth/login" />
        }>
          <Route path="/store-admin" element={<StoreAdminLayout />}>
            <Route index element={<StoreAdminHome />} />
            <Route path="products" element={<StoreAdminProducts />} />
            <Route path="orders" element={<StoreAdminOrders />} />
            <Route path="categories" element={<StoreAdminCategories />} />
            <Route path="reviews" element={<StoreAdminReviews />} />
            <Route path="settings" element={<StoreAdminSettings />} />
          </Route>
        </Route>

        {/* ── Storefront (store-specific pages with Navbar) ─────────────── */}
        <Route element={<StorefrontLayout />}>
          <Route path="/:storeSlug" element={<StorePage />} />
          <Route path="/:storeSlug/account" element={<StorefrontAccountPage />} />
          <Route path="/:storeSlug/privacy" element={<StorePrivacyPage />} />
          <Route path="/:storeSlug/terms" element={<StoreTermsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
