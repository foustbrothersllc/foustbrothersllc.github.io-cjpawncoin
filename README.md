# C&J Pawn & Games — E-Commerce Storefront

A full-stack e-commerce site for C&J Pawn & Games built with Next.js 15, Supabase, and Stripe.

## Tech Stack
- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS**
- **Supabase** (Postgres database)
- **Stripe** (Checkout + Webhooks)
- **Vercel** (deployment)

---

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase
1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to **SQL Editor**
3. Paste and run the contents of `/supabase/schema.sql`
4. Go to **Settings → API** and copy your Project URL and anon key

### 3. Set up Stripe
1. Go to [stripe.com](https://stripe.com) and create an account
2. Go to **Developers → API keys** and copy your publishable and secret keys
3. For webhooks (after deploying): go to **Developers → Webhooks**, add endpoint `https://your-domain.com/api/webhooks/stripe`, listen for `checkout.session.completed`

### 4. Configure environment variables
```bash
cp .env.local.example .env.local
```
Fill in your `.env.local` with real values:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo
3. Add all environment variables in the Vercel dashboard (same as `.env.local` but with your live domain for `NEXT_PUBLIC_SITE_URL`)
4. Deploy — Vercel auto-detects Next.js

---

## Admin Dashboard
Visit `/admin` to add, edit, and delete inventory items and view orders.

## Project Structure
```
/app              → Pages and API routes
/components       → UI components
/lib              → Supabase, Stripe, cart context, server actions
/types            → TypeScript types
/supabase         → Database schema SQL
```
