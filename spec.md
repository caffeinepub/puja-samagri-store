# Samudraj

## Current State
- App is deployed with all features: catalog, cart, checkout, prasad, pandit, admin, etc.
- Add to Cart sometimes fails with 'Failed to add to cart' error
- Images (product photos, temple photos, logo, hero banners) are not visible on the site
- useAddToCart in useQueries.ts silently swallows ensureCallerIsUser errors and then calls addToCart — if actor initialization fails, the whole mutation throws
- Image files exist in /assets/generated/ and /assets/uploads/ but some may not be properly surfaced through the build pipeline due to dynamic string references

## Requested Changes (Diff)

### Add
- Retry logic for ensureCallerIsUser in useAddToCart (retry up to 3 times with delay before proceeding to addToCart)
- Explicit import/reference of all image assets in a centralized images index file so build pipeline detects them all
- Image onError fallbacks with emoji/gradient placeholders across all pages

### Modify
- useAddToCart: wrap _initializeAccessControlWithSecret in try/catch so actor creation doesn't fail completely if the token call fails; ensure ensureCallerIsUser is retried properly
- All pages using temple/product/pandit images: add onError handlers with fallback
- Shankh logo in Navbar: add onError fallback to SVG inline logo

### Remove
- Nothing

## Implementation Plan
1. Fix useAddToCart in useQueries.ts: wrap actor init in try/catch for the adminToken step; add retry for ensureCallerIsUser (up to 2 retries)
2. In Navbar: add onError on shankh logo img to show inline SVG fallback
3. In CatalogPage, ProductDetailPage, PrasadBookingPage, BookPanditPage: add onError handlers on all <img> tags
4. Create/update src/frontend/src/data/imageAssets.ts that explicitly imports/references every asset path so build scanner picks them all up
5. Validate build passes
