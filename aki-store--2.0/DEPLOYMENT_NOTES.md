# Deployment Notes: Chrome "Private Network Access" Web Security

If you are accessing your live frontend (e.g., hosted on Vercel at `https://aki-omega.vercel.app`) but your backend is still running locally on your computer (e.g., `http://localhost:5000`), you will likely encounter a Chrome security popup that says:

> **"aki-omega.vercel.app wants to Access other apps and services on this device"**
> [Allow] [Block]

## Why does this happen?
This is a strict security feature in Google Chrome and modern browsers called **"Private Network Access" (PNA)**. It prevents public websites on the internet from secretly scanning or communicating with devices on your private local network (like your router, smart home devices, or your local laptop's `localhost`). 

Because your Vercel frontend is public but your Express backend is on `localhost`, Chrome intervenes to ask for your explicit permission.

## How to fix it for Production
Real users should **never** see this. To fix this permanently:

1. **Deploy your Node.js Backend:**
   Your backend currently runs only on your local machine (`npm run dev`). You must deploy the `backend` folder to a cloud hosting provider such as:
   - [Render](https://render.com/)
   - [Railway](https://railway.app/)
   - [Heroku](https://www.heroku.com/)
   
   Once deployed, your backend will have a public secure URL (e.g., `https://aki-backend.onrender.com`).

2. **Update Vercel Environment Variables:**
   Go to your Vercel Dashboard for the frontend project (`aki-omega`):
   - Navigate to **Settings** > **Environment Variables**
   - Add a new variable:
     - **Name:** `VITE_API_URL`
     - **Value:** Your deployed public backend URL (e.g., `https://aki-backend.onrender.com`)

3. **Redeploy the Frontend:**
   Trigger a redeployment of your Vercel frontend so it rebuilds using the new public API URL. 

Once your frontend communicates exclusively with your public cloud backend, Chrome will no longer consider it a cross-network request, and the scary local access prompt will completely disappear for everyone.

## Local Testing
If you are merely testing your Vercel deployment right now and intentionally want it to connect back to your laptop’s `localhost` backend:
- You can simply click **"Allow"**. This is fine for development testing alone, but remember to deploy the backend before directing real end-users to your Vercel app.
