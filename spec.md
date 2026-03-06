# Puja Samagri Store

## Current State
Full-stack puja samagri e-commerce with:
- Product catalog (flowers, haar, books, puja essentials, thali sets, occasion packages) with 21 seeded products
- Shopping cart (add/remove/clear) with cart drawer
- Checkout and order placement
- Schedule page for daily flower/haar orders with time slots
- Book a Pandit page (6 local pandits, booking form, my bookings — all stored locally via useBookings hook)
- Order history (My Orders page)
- Authorization system (admin role via accessControlState)
- Backend: `addToCart`, `getCart`, `placeOrder`, `getAllOrders`, `updateOrderStatus`, `getAllProducts`, `addProduct`, `updateProduct`, `removeProduct`
- No admin panel UI exists yet
- Cart bug: `useActor` always returns an actor (anonymous when not logged in), so `addToCart` mutation never gets `!actor` path — instead it calls the backend with anonymous principal which `requireAuthenticated` traps; this error surfaces as "Failed to add to cart" even though the user is prompted to log in. The real issue is the mutation fires with an unauthenticated actor.

## Requested Changes (Diff)

### Add
- **Admin Panel** (`/admin` route, admin-only):
  - Orders tab: list all orders, filter by status (pending/processed/shipped/cancelled), update order status inline
  - Pandit Availability tab: toggle each pandit's availability on/off (persisted in backend)
  - Products tab (basic): view all products, toggle inStock status
  - Admin access guard: redirect non-admins with a message
- **Backend: Pandit Availability storage**:
  - `setPanditAvailability(panditId: Text, available: Bool)` — admin only
  - `getPanditAvailabilities()` — returns array of `{panditId: Text, available: Bool}`
- **Animated Product Cards**: modern staggered entrance animation, hover lift + glow, shimmer on add-to-cart success, micro-interaction on the Add to Cart button (scale pulse on click)
- **Admin nav link** in Navbar (only shown when isAdmin === true)

### Modify
- **Cart Bug Fix**: In `useAddToCart` mutation, check `identity` directly (not just actor) before calling — if user is not logged in, throw a clear error with a login prompt. Alternatively, always check `identity` in `handleAddToCart` before calling `addToCart.mutate`, which is already done in CatalogPage but the mutation itself must also guard. The real fix: in `useActor`, do NOT return an anonymous actor when identity is absent — return null so downstream `!actor` checks work. This ensures `addToCart` throws "Not authenticated" before calling the canister.
- **BookPanditPage**: Wire pandit availability to backend — load from `getPanditAvailabilities()` and merge with local PANDITS data so admin toggle reflects in real time
- **CatalogPage ProductCard**: Enhanced animations — staggered fade+scale entrance, hover card lift with shadow glow, Add to Cart button scale pulse on click, success shimmer

### Remove
- Nothing removed

## Implementation Plan
1. Update Motoko backend: add `setPanditAvailability` and `getPanditAvailabilities` functions with a `panditAvailabilityStore`
2. Fix cart bug: modify `useActor.ts` to return null when not authenticated (remove anonymous actor fallback), so `!actor` in mutations correctly blocks unauthenticated calls
3. Add `useSetPanditAvailability` and `usePanditAvailabilities` hooks to `useQueries.ts`
4. Create `AdminPage.tsx` with tabs: Orders, Pandit Availability, Products
5. Add `/admin` route in `App.tsx`
6. Add conditional "Admin" nav link in `Navbar.tsx`
7. Enhance `ProductCard` animations in `CatalogPage.tsx` — staggered entrance, hover glow, button micro-interaction
8. Update `BookPanditPage.tsx` to load pandit availability from backend and merge with PANDITS data
