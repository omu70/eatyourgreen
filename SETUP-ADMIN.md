# Eat Your Green — Admin setup (Supabase + Razorpay)

Your admin lives at **/admin**. It shows orders, revenue and email leads, and lets you
edit products and key site copy. Public pages keep working even before this is set up
(they fall back to the built-in content).

## 1. Create the database tables
In Supabase → **SQL Editor** → New query → paste the contents of `supabase/schema.sql` → **Run**.

## 2. Lock down sign-ups + create your admin user
- Supabase → **Authentication → Providers → Email**: keep Email enabled.
- **Authentication → Sign In / Providers** (or Settings): turn **OFF** "Allow new users to sign up"
  so only people you add can log in.
- **Authentication → Users → Add user**: create your login (email + password). Use this email below.

## 3. Get your keys
Supabase → **Project Settings → API**:
- Project URL  → `NEXT_PUBLIC_SUPABASE_URL` (already set to your project)
- `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY`  (keep secret!)

## 4. Add environment variables (Vercel → Settings → Environment Variables)
```
NEXT_PUBLIC_SUPABASE_URL=https://hbsgwulglogwxhxkqtpf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your anon key>
SUPABASE_SERVICE_ROLE_KEY=<your service_role key>
ADMIN_EMAILS=<the email you created in step 2>     # comma-separate for more than one

# Razorpay (for taking payments)
NEXT_PUBLIC_RAZORPAY_KEY_ID=<rzp_live_or_test_key_id>
RAZORPAY_KEY_ID=<same key id>
RAZORPAY_KEY_SECRET=<your key secret>
```
Then **Redeploy** (Deployments → ⋯ → Redeploy). Env changes only apply on a new build.

## 5. First login + import products
- Go to **/admin/login** and sign in.
- Open **Products → "Import current site products"** to load the 3 books into the database.
- Edit prices, titles and copy under **Products** and **Content**. Saved changes go live within a few seconds.

## How data flows
- **Leads:** the free-sample and contact forms POST to `/api/lead` → saved to `leads`.
- **Orders:** after a Razorpay payment, `/api/razorpay/verify` checks the signature and saves the sale to `orders`.
- **Public site:** reads products + content from Supabase when configured, otherwise uses the built-in defaults — so it never breaks.

## Security notes
- The `service_role` key is server-only — it's never sent to the browser. Don't put it in a `NEXT_PUBLIC_` variable.
- `/admin` is protected by middleware: only logged-in users whose email is in `ADMIN_EMAILS` get in.
- Row Level Security is on for every table; leads/orders have no public policies (server-only access).
