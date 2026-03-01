# Deployment & Network Access Guide

This document explains how to resolve "Failed to Fetch" errors when accessing the AKI Storefront from different devices or via the Vercel URL.

## 1. Why is "Failed to Fetch" happening?
By default, the frontend is configured to talk to `http://localhost:5000`. 
- **On your PC**: This works because the backend and frontend are on the same machine.
- **On other devices (Mobile, Tablet)**: They don't have the backend running on `localhost`. They try to find a server on *their own* localhost and fail.
- **On Vercel**: Vercel serves the code to your browser. Your browser then tries to find the backend at `localhost`, which fails unless you are running the backend on that specific device.

---

## 2. Solution for Local Testing (Same Wi-Fi)
To test on your phone while the backend runs on your laptop:

1.  **Find your Laptop's Local IP**:
    - Open Command Prompt and type `ipconfig`.
    - Look for "IPv4 Address" (e.g., `192.168.1.15`).
2.  **Update Frontend Environment**:
    - Create or edit `frontend/.env`:
      ```env
      VITE_API_URL=http://192.168.1.15:5000
      ```
    - Restart the frontend dev server (`npm run dev`).
3.  **Access on Mobile**:
    - Use the URL: `http://192.168.1.15:5173` (or whatever port Vite uses).

---

## 3. Solution for Vercel (Production)
If you want the Vercel deployment to work for everyone:

1.  **Deploy the Backend**:
    - You MUST host the `backend` folder on a service like **Render**, **Railway**, or **Railway.app**.
2.  **Set Vercel environment variables**:
    - In your Vercel Dashboard, go to **Settings > Environment Variables**.
    - Add `VITE_API_URL` and set it to your **public backend URL** (e.g., `https://aki-backend.onrender.com`).
3.  **Update Backend CORS**:
    - I have already updated the backend to be more flexible, but ensure your Vercel URL is explicitly listed in `backend/src/index.ts` in the `allowedOrigins` array if it changes.

---

## 4. Mobile Menu & Routing Fixes
- **Real-time Updates**: The Mobile Menu is now tied to the `storeSlug` in the URL. Switching stores now refreshes the menu content instantly.
- **Dynamic Categories**: The menu now fetches the actual categories and product counts from the backend for each store.
- **Aesthetic Alignment**: The menu now uses the "Architect" design tokens (Cinzel font, premium spacing).
