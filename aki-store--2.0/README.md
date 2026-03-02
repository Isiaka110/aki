# AKI Commerce — Vite Frontend

> A modern eCommerce SaaS platform for African creators and boutique brands. Build, manage, and sell through a beautifully crafted storefront — powered by Vite + React + Tailwind CSS v4.

---

## Project Structure

```
aki-store--2.0/
├── frontend/                  <- Vite SPA (this is what you deploy)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   │   └── vercel.json        <- SPA routing config
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
└── backend/                   <- Node/Express API
```

---

## Local Development

```bash
cd frontend
npm install
npm run dev
# App runs at http://localhost:5173
```

---

## Step-by-Step: Deploy to Vercel

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "ready for Vercel deployment"
git push origin main
```

### Step 2 — Create a Vercel Account

Go to https://vercel.com and sign up with your GitHub account.

### Step 3 — Import Your Repository

1. Dashboard -> Add New -> Project
2. Import Git Repository -> select `Isiaka110/aki`
3. Click Import

### Step 4 — Configure Build Settings

**IMPORTANT:** Set the Root Directory to `frontend`.

| Setting              | Value           |
|----------------------|-----------------|
| Framework Preset     | Vite            |
| Root Directory       | `frontend`      |
| Build Command        | `npm run build` |
| Output Directory     | `dist`          |
| Install Command      | `npm install`   |

### Step 5 — Environment Variables (optional)

Add any `VITE_` prefixed variables your app needs:

```
VITE_API_URL = https://your-api.onrender.com
```

### Step 6 — Deploy

Click **Deploy**. Wait for the build to finish. Your URL will be:
`https://your-project.vercel.app`

### Step 7 — SPA Routing Fix (Important!)

The file `frontend/public/vercel.json` is already included and handles this automatically:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This ensures routes like `/store-admin` or `/auth/login` don't 404 on page refresh.

### Step 8 — Custom Domain (Optional)

1. Project Settings -> Domains -> Add Domain
2. Type your domain (e.g. `aki.store`)
3. Follow the DNS instructions (CNAME/A record at your registrar)
4. Vercel auto-provisions HTTPS

---

## Redeployments

Every `git push` to `main` triggers an automatic redeploy.
You can also go to: **Dashboard -> Deployments -> Redeploy**

---

## Troubleshooting

### `Property 'fill' does not exist on img`

```tsx
// Wrong
<img src={x} fill className="object-cover" />

// Correct
<img src={x} className="object-cover w-full h-full" />
```

### `router.push is not a function`

```tsx
// Wrong (Next.js pattern)
const router = useNavigate();
router.push("/path");

// Correct (react-router-dom)
const navigate = useNavigate();
navigate("/path");
```

### `Cannot find module 'next/link'`

```tsx
// Wrong
import Link from 'next/link'
<Link href="/path">...</Link>

// Correct
import { Link } from 'react-router-dom'
<Link to="/path">...</Link>
```

---

## Production Build (local test)

```bash
cd frontend
npm run build    # Compiles into /dist
npm run preview  # Preview at http://localhost:4173
```

---

## Production Run (monolith)

```bash
npm install
npm run build    # Compiles both frontend and backend
npm run start    # Starts the production backend
```

---

MIT License
