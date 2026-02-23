# AKI Store — The Premier Local Commerce Platform

AKI is a high-end, independent e-commerce platform designed to empower local businesses with a world-class digital presence. Built with a "Premium-First" philosophy, it bridges the gap between local craft and global-standard shopping experiences.

## 🚀 Key Features

### 🛍️ Shopper Experience
- **Iconic Discovery**: Explore curated local stores with a high-fidelity interface.
*   **Premium Checkout**: A streamlined, secure, and mobile-optimized multi-step checkout flow.
*   **Customer Hub**: Dedicated `/account` dashboard for tracking orders, managing wishlists, and shipping addresses.
*   **QuickView & Cart**: Interactive product previews and a seamless slide-out cart drawer powered by Zustand.

### 🏪 Merchant Dashboard (The Core)
- **Advanced Product Builder**: A 4-step interactive wizard for detailed product cataloging (Media, Pricing, Logistics).
- **Order Management**: Heavy-duty dashboard for fulfillment tracking and bulk operations.
- **Brand Settings**: Control store aesthetics, including custom accent colors and default theme modes (Light/Dark).
- **Analytics Overview**: At-a-glance insights into revenue, store views, and active orders.

### 🆕 Vendor Onboarding
- **Interactive Guide**: A dedicated `/onboarding` experience that guides new creators through claiming their store, branding, and setting up payments in under 10 minutes.

---

## 🛠️ Technology Stack

*   **Framework**: [Next.js 15.1.7](https://nextjs.org) (App Router)
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com) (Advanced utility-first styling)
*   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Fast, scalable store management)
*   **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) (Native Light/Dark/System mode support)
*   **Icons**: [Lucide React](https://lucide.dev)
*   **Typography**: [Geist & Geist Mono](https://vercel.com/font) (Premium variable fonts)

---

## 📂 Project Structure

The codebase is organized into strategic route groups for clean separation of concerns:

-   `app/(marketing)`: Static public pages (Landing, About, Contact, Legal).
-   `app/(storefront)`: Consumer-facing discovery and user account modules.
-   `app/store-admin`: The comprehensive merchant management suite.
-   `app/auth`: Modern, split-view authentication flows.
-   `app/checkout`: Specialized high-conversion checkout environment.
-   `app/components`: Reusable, context-aware premium UI components.

---

## 🏁 Getting Started

### 1. Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the platform.

---

## ✨ Design Philosophy
AKI is built to **WOW**. 
Everything from the micro-animations in `globals.css` to the high-contrast color palettes and Geist typography is selected to provide a premium, "standalone boutique" feel rather than a generic marketplace.

© 2026 AKI Market Group. All rights reserved.
