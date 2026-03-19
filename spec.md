# Samudraj

## Current State
The app has: Home, Shop (CatalogPage), Product Detail, Cart (Drawer), Checkout, Order Confirmation, My Orders, My Dashboard, Book Pandit, Pandit Profile, Prasad Booking, Schedule, Admin pages.

## Requested Changes (Diff)

### Add
- `/about` — About Us page
- `/contact` — Contact Us page with form
- `/return-policy` — Return/Refund Policy page
- `/privacy-policy` — Privacy Policy page
- `/shipping-policy` — Shipping Policy page
- Routes in App.tsx for all 5 new pages
- Footer links for all new policy/info pages

### Modify
- Footer.tsx — add a new "Info & Policies" column with links to About, Contact, and the 3 policy pages
- App.tsx — register 5 new routes

### Remove
- Nothing

## Implementation Plan
1. Create AboutPage.tsx — brand story, values, team, mission section
2. Create ContactPage.tsx — contact form (name, email, phone, message), contact info (address, phone, email, hours)
3. Create ReturnPolicyPage.tsx — full return/refund policy tailored to floral/puja products
4. Create PrivacyPolicyPage.tsx — data collection, usage, cookies, ICP context
5. Create ShippingPolicyPage.tsx — delivery timeframes, areas, charges, handling
6. Register all 5 routes in App.tsx
7. Add "Info & Policies" section to Footer with links
