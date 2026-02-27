
### 1. Problem Statement & Proposed Solutions

The AKI platform is designed to address three specific pain points in the local e-commerce ecosystem:

**Problem 1: High Barrier to Professional Online Presence**
Many small businesses rely solely on social media pages because building a custom, aesthetic e-commerce website is too expensive and technically complex.

* **Solution 1:** AKI provides an instant, customizable standalone storefront (`aki.com/[store-name]`) with a premium, mobile-responsive UI (Light/Dark mode) that requires zero coding from the vendor.

**Problem 2: Chaotic Order and Inventory Management**
Tracking sales, answering "how much?" in DMs, and managing stock manually across notebooks or chat apps leads to lost sales and poor customer service.

* **Solution 2:** A centralized Store Owner Dashboard that handles product listings, automated cart checkouts, and tiered inventory management (manual for the Free tier, automated stock deduction for the Pro tier).

**Problem 3: Lack of Consumer Trust in Independent Vendors**
Buyers are often hesitant to purchase from standalone social media vendors due to fear of scams, non-delivery, or poor quality.

* **Solution 3:** A unified platform with a built-in, moderated review system. Verified reviews build social proof on the vendor's standalone page, and the AKI Super Admin maintains oversight to ban fraudulent stores.

---

### 2. Entity Relationships (Database Architecture)

Before writing the Prisma schema, we must define how the data relates.

* **User (Owner)  Store:** One-to-One (One user owns one store).
* **Store  Product:** One-to-Many (A store has multiple products).
* **Store  Order:** One-to-Many (A store receives multiple orders).
* **Store  Review:** One-to-Many (A store has multiple reviews).
* **Product  OrderItem:** One-to-Many (A product can be part of many different orders).

---

### 3. User Workflows (How to Use the App)

**For the Store Owner (Vendor Flow):**

1. **Onboarding:** Signs up, agrees to the AKI Seller Terms, and claims their unique `/[store-name]` URL.
2. **Setup:** Accesses the Admin Dashboard, uploads a logo/banner, and selects a theme preference.
3. **Inventory:** Clicks "Add Product," uploads images, sets prices (and slashed sale prices), and inputs stock quantity.
4. **Management:** Shares their link. As orders come in, they view them in the "Orders" tab, process them, and moderate incoming customer reviews.

**For the Customer (Buyer Flow):**

1. **Discovery:** Arrives via the vendor's direct link or browses the AKI main landing page.
2. **Shopping:** Browses the clean product grid, toggles Light/Dark mode, and clicks "Add to Cart" to open the slide-out cart drawer.
3. **Checkout:** Clicks "Checkout," enters shipping details, and completes the purchase.
4. **Post-Purchase:** Receives an order summary and is later prompted to leave a review on the store's page.

---

### 4. Functional Requirements

These are the specific behaviors the system *must* perform.

* **Authentication & Authorization:**
* The system must allow secure registration/login for Store Owners (e.g., via email/password or OAuth).
* The system must restrict Super Admin dashboard access to authorized platform owners only.


* **Store Management:**
* The system must generate a unique, functional URL routing to the vendor's specific store data.
* The system must allow vendors to toggle between Free (Starter) and Pro subscription features.


* **Product & Inventory Management:**
* The system must allow vendors to Create, Read, Update, and Delete (CRUD) products.
* The system must support image uploads for products and store branding.


* **Shopping & Checkout:**
* The system must maintain a persistent shopping cart session for guest buyers.
* The system must calculate subtotals, apply potential discounts, and generate an order record upon checkout.


* **Review System:**
* The system must allow buyers to submit a 1-5 star rating and text review.
* The system must hold reviews in a "Pending" state until approved by the respective Store Owner.



---

### 5. Non-Functional Requirements

These define system attributes such as performance, usability, and security.

* **Performance:** The standalone store pages (`/[store-name]`) must load within 2 seconds to prevent buyer drop-off, utilizing Next.js Server-Side Rendering (SSR) or Static Site Generation (SSG) where appropriate.
* **Scalability:** The database architecture must be able to handle concurrent read/write requests during high-traffic shopping events (e.g., Black Friday sales across multiple vendors).
* **Usability:** The UI must be fully mobile-responsive, adhering to the minimalist, high-contrast design system discussed, ensuring clear visibility in both Light and Dark modes.
* **Security:** All API routes handling data mutations (adding products, updating orders) must be protected against unauthorized access. Passwords and sensitive data must be securely hashed in the database.
* **Maintainability:** The codebase must utilize strict TypeScript typing and modular React components to allow for seamless future migration to a React Native mobile application.
