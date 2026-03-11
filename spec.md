# Puja Samagri Store

## Current State
- BookPanditPage shows list of pandits with basic card; no dedicated profile page
- No location/geolocation feature for finding nearby pandits
- KitCustomizer shows items but price is static (does not change when items toggled)
- Kit items list is minimal (8 items per kit)
- ProductDetailPage is fully detailed (reviews, ratings, related, add-to-cart)

## Requested Changes (Diff)

### Add
- New `/pandit/$id` route and `PanditDetailPage` — full profile page like ProductDetailPage: large photo, bio, all specializations, experience, languages, area, price, reviews/ratings, certifications, booking CTA
- Location permission prompt on Book a Pandit page — asks user for geolocation on first visit; if granted, calculates distance from user to each pandit's area using lat/lng coordinates on pandits; sorts pandit list by proximity; shows distance badges on pandit cards
- Each KitItem gets a `price` (in paise) and `quantity` field
- Dynamic kit price calculation — KitCustomizer computes sum of selected items' prices; parent ProductDetailPage reads this computed price and shows it (overriding the static product price)
- Expanded kit items: 14-16 items per kit (Navratri, Griha Pravesh, Ganesh Chaturthi) reflecting real puja requirements

### Modify
- `PANDITS` data — add lat/lng coordinates for each pandit area (approximate Mumbai coords)
- `KIT_ITEMS` data — add `price` and `qty` fields to every item
- `KitCustomizer` component — compute and expose total selected price; show per-item price; show running total in Kit Summary
- `ProductDetailPage` — pass dynamic kit price to the price display when a kit is open and items are selected
- `PanditCard` on BookPanditPage — add "View Profile" button linking to `/pandit/$id`; show distance badge if location is available
- App.tsx — add pandit detail route

### Remove
- Nothing removed

## Implementation Plan
1. Update `pandits.ts` — add lat/lng to each pandit
2. Update `kitItems.ts` — expand all 3 kits to 14-16 items each; add `price` (paise) and `qty` to each item
3. Create `PanditDetailPage.tsx` — full-detail pandit page with booking CTA, reviews placeholder, specializations, bio, map area
4. Update `BookPanditPage.tsx` — add location permission banner/hook; sort pandits by distance; add distance badge on cards; add "View Profile" link
5. Update `ProductDetailPage.tsx` / `KitCustomizer` — dynamic price calculation from selected items; show price per item and running total
6. Update `App.tsx` — add `/pandit/$id` route
