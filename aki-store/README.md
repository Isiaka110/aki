# AKI - Premium E-Commerce Platform

Welcome to **AKI**, a premium, beautifully curated e-commerce platform designed to give store owners a highly aesthetic and personalized digital presence. 

This platform allows creatives, directors, and store owners to easily spin up a personalized storefront, manage their brand identity, and connect seamlessly with their clientele.

---

## 🎭 Two Main Experiences 

This platform caters to two primary users:
1. **The Store Admin (Creative Director / Store Owner):** Manages the brand identity, products, orders, and handles direct customer interactions via WhatsApp.
2. **The Client (Customer):** Explores personalized storefronts, curates their cart, leaves feedback, and completes acquisitions.

---

## 🛠️ 1. Store Admin Workflow (The Backend Experience)

If you are a Store Owner, your control center is the **Atelier Overview** (Admin Dashboard).

### Accessing the Admin Panel
Navigate to `http://localhost:3000/store-admin` (or your live domain equivalent) to access your dashboard.

### Key Workflows:

#### A. Initializing Your Brand (Settings & Customization)
The first thing you should do is set up your brand's digital identity.
1. Go to **Settings** (`/store-admin/settings`).
2. **Brand Profile:** Input your actual Name (Owner / Director Name), your Designation (e.g., Creative Director), and write your custom Brand Manifesto/Story. 
3. **Contact Information:** Ensure you add your Contact Email, Twitter, and Instagram handle. These will automatically populate the "Connect" tab on your public Profile and Footer.
4. **WhatsApp Integration:** Add your WhatsApp number. When clients checkout, they will be redirected to WhatsApp to send you their order details directly using this number!
5. **Visual Identity:** You can change your brand's core theme (Light/Dark/System) and your Primary Accent Color. This automatically styles the buttons and UI of your public storefront to match your aesthetic vibe.
6. Click **Save Configurations** and watch your storefront instantly update.

#### B. Managing Acquisitions (Orders)
When a customer checks out:
1. They will generate an order and send you a pre-filled WhatsApp message.
2. Inside your Admin panel, navigate to **Overview** or **Orders** to view a detailed table of all transactions, monitor their fulfillment status (Pending, Shipped, Delivered), and manage inventory output.

#### C. Moderating Client Feedback (Reviews)
Customers can leave reviews on your public storefront. 
1. Navigate to **Reviews** (`/store-admin/reviews`).
2. All new customer feedback will appear as "Pending".
3. You can review the comment, star rating, and product acquired, and explicitly **Authorize** or **Decline** it before it permanently shows up on your public storefront catalog.

---

## 🛍️ 2. The Client Workflow (The Frontend Experience)

Customers experience a locked-in, immersive shopping journey defined by the Store Owner's aesthetic.

### Key Workflows:

#### A. Exploring the Personalized Storefront
A customer enters a personalized storefront via a slug (e.g., `http://localhost:3000/aki`).
1. **Product Discovery:** They can navigate the "Directory" using the sidebar to sort by "Maison Decor", "Audio Fidelity", or view "New Arrivals" and "Most Coveted".
2. **Immersive UI:** The entire UI is governed by the Store Owner's theme (e.g., Dark Mode) and colors (e.g., Rose, Emerald).

#### B. The Director's Profile (Store Account Page)
By clicking the "User" icon in the top right, instead of a generic login page, the client is taken to the **Store Owner Profile** (`/aki/account`).
- **Curated Pieces:** A gallery showing all products owned by that specific director.
- **Manifesto:** A beautiful typographic rendering of the Director's vision.
- **Connect & Inquiry:** A direct gateway to the owner's Instagram, Twitter, and official Support Email. 

#### C. Checkout & Logistics
1. The client adds pieces to their Cart (Slide-out Drawer).
2. They proceed to Checkout (`/checkout`). 
3. Upon successfully placing the order, they land on the **Success Page**. 
4. **The WhatsApp Handoff:** They can click the "Track Logistics via WhatsApp" button. This dynamically links them to the Store Owner's WhatsApp with a perfectly formatted receipt containing Order ID, Item Breakdown, and Total Cost.
5. **Retention:** Clicking "Return to Directory" intentionally prevents them from leaving the personalized store, taking them right back to the specific shop (e.g., `/aki`) rather than the global platform.

#### D. Leaving Feedback
1. At the bottom of the Storefront, clients can view **Client Feedback** (testimonials).
2. Below that, they will find the **Submit Evaluation** form. 
3. **Verification:** The system enforces strict quality control. Clients can only leave feedback if they have a verified local acquisition history (recently checked out).
4. **Rate Limit:** The platform graciously limits evaluations to once per day per client using browser storage, preventing spam and ensuring high-signal reviews for the Admin to moderate.

---

## 💡 Navigational Guardrails

**Anti-Leak System:** The platform is built so that once a customer is immersed in your digital space, they stay there.
- If a client is browsing a personalized store (like `/aki`) and clicks the global "AKI." application logo in the navigation bar, they will receive a highly customized **Exit Warning Modal**.
- This modal verifies whether they truly want to leave the store's ecosystem and return to the main platform directory, or if they wish to stay immersed.

Enjoy building your digital empire with AKI.
