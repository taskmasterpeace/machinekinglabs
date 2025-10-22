# Machine King Labs - Claude Code Context

## Project Overview

Machine King Labs is an AI-native technology company's corporate website and e-commerce platform. Built with Astro 5.x (SSR mode) and deployed on Vercel, it showcases the company's portfolio, team, and sells branded merchandise through a Printful/Stripe integration.

**Location**: `C:\git\homepage\machine-king-labs\`

## Tech Stack

- **Framework**: Astro 5.x with SSR (`output: 'server'`)
- **Styling**: Tailwind CSS v4 (via @tailwindcss/vite)
- **Animations**: GSAP 3.13 with ScrollTrigger
- **3D Graphics**: Three.js 0.180
- **E-commerce**: Printful API (print-on-demand) + Stripe payments
- **Deployment**: Vercel (via @astrojs/vercel adapter)
- **Runtime**: Node.js with ES modules

## Development

```bash
npm run dev     # Start dev server on http://localhost:4321
npm run build   # Build for production
npm run preview # Preview production build locally
```

## Project Structure

```
src/
├── components/           # Reusable Astro components
│   ├── Cart.astro       # Shopping cart sidebar
│   ├── ProductCard.astro # Product grid card
│   ├── ProductModal.astro # Product detail modal with image carousel
│   └── OctopusLogo.astro # Animated SVG logo
├── lib/                 # Core business logic
│   ├── printful.ts      # Printful API integration
│   ├── stripe.ts        # Stripe checkout & webhooks
│   └── cart.ts          # Client-side cart (localStorage)
├── pages/               # File-based routing
│   ├── index.astro      # Homepage
│   ├── about.astro
│   ├── team.astro
│   ├── projects.astro
│   ├── innovation-lab.astro
│   ├── contact.astro
│   ├── gear.astro       # E-commerce store page
│   ├── gear/
│   │   ├── success.astro
│   │   ├── shipping.astro
│   │   └── returns.astro
│   └── api/             # SSR API routes
│       ├── gear/
│       │   ├── products.ts   # GET /api/gear/products
│       │   └── checkout.ts   # POST /api/gear/checkout
│       └── webhooks/
│           ├── stripe.ts     # POST /api/webhooks/stripe
│           └── printful.ts   # POST /api/webhooks/printful
├── layouts/
│   └── Layout.astro     # Main layout with nav & footer
└── styles/
    └── global.css       # Global styles & Tailwind imports
```

## Key Architecture Patterns

### 1. Printful Integration

**File**: `src/lib/printful.ts`

- All products are synced from Printful via API
- Uses Bearer token authentication (`PRINTFUL_API_TOKEN` env var)
- Key functions:
  - `getAllProductsWithVariants()` - Fetches all store products with variants
  - `createOrder()` - Creates Printful order after payment
  - `getOrderByExternalId()` - Retrieves order by Stripe session ID

**Important Pattern**: Product file arrays have VARIABLE lengths:
- 3-file products: `[front_design, back_design, mockup]`
- 4-file products: `[print_file, front_design, back_design, mockup]`
- **Always use `files[files.length - 1]` to get the mockup image** (never hardcode index)

### 2. Product API Transformation

**File**: `src/pages/api/gear/products.ts`

- Caches products for 5 minutes (currently disabled: `CACHE_TTL = 0`)
- Transforms Printful response for client consumption
- **Critical Fix Applied**: Uses dynamic array indexing to handle variable file counts:

```typescript
// Get mockup from LAST file (handles 3 or 4 file products)
const fileCount = firstVariant?.files?.length || 0;
const mockupFile = fileCount > 0 ? firstVariant.files[fileCount - 1] : null;
```

- Returns: `{ id, name, thumbnail, variants[] }` structure
- Each variant includes `files[]` array with `{ url, preview, thumbnail }`

### 3. Product Modal with Carousel

**File**: `src/components/ProductModal.astro`

**Features**:
- Displays product details in modal overlay
- Image carousel with multiple design views + mockup
- Navigation: Previous/Next buttons, indicator dots, keyboard arrows
- Auto-hides carousel controls when only 1 image
- **Deduplication**: Uses `Set` to remove duplicate image URLs
- Starts carousel on last image (the mockup)

**Key JavaScript Functions**:
- `updateVariantDisplay()` - Loads images when variant changes
- `updateCarousel()` - Updates image and controls
- `navigateCarousel(direction)` - Prev/Next navigation
- Keyboard listener for arrow keys (Left/Right)

**Image Deduplication Pattern**:
```typescript
const allImages = variant.files
  .filter((file: any) => file.preview)
  .map((file: any) => file.preview);

// Remove duplicates - keep only unique image URLs
currentImages = [...new Set(allImages)];
```

### 4. Cart Management

**File**: `src/lib/cart.ts`

- **Client-side only** (localStorage-based)
- Storage key: `'machine-king-labs-cart'`
- Dispatches `'cart-updated'` custom event on changes
- Key functions:
  - `addToCart(item)` - Merges quantities if item exists
  - `getCart()` / `saveCart(cart)` - localStorage persistence
  - `getCartSubtotal()` - Calculates total price
  - `onCartUpdate(callback)` - Event listener for cart changes

**Cart Item Interface**:
```typescript
{
  variantId: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku?: string;
}
```

### 5. Stripe Checkout Flow

**File**: `src/lib/stripe.ts`

1. User clicks checkout → `POST /api/gear/checkout` with cart items
2. API creates Stripe Checkout Session with line items
3. Redirect to Stripe-hosted checkout page
4. After payment → redirect to `/gear/success?session_id={CHECKOUT_SESSION_ID}`
5. Stripe webhook → `POST /api/webhooks/stripe` triggers Printful order

**Webhook Flow** (`src/pages/api/webhooks/stripe.ts`):
- Verifies signature with `STRIPE_WEBHOOK_SECRET`
- On `checkout.session.completed`:
  - Extracts shipping address
  - Extracts line items with variant IDs
  - Creates Printful order with `external_id = session.id`

**Environment Variables Required**:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `PRINTFUL_API_TOKEN`

### 6. GSAP Scroll Animations

Multiple pages use GSAP ScrollTrigger for reveal animations:
- Fade-in on scroll with `opacity: 0` → `opacity: 1`
- Y-axis translation: `y: 50` → `y: 0`
- Common pattern in `index.astro`, `about.astro`, `projects.astro`

## Recent Bug Fixes & Features

### Bug Fix: Product Images Showing Wrong File (Commit e7594db)

**Problem**: "Hey Youre Hired" products showed design artwork instead of mockup photos.

**Root Cause**: Code used hardcoded `files[2]` which worked for 3-file products but grabbed wrong file for 4-file products.

**Solution**: Changed to `files[files.length - 1]` to always use last file (the mockup).

**Files Modified**:
- `src/pages/api/gear/products.ts` (lines 33-49)

### Feature: Product Image Carousel (Commit 3a443b2)

**What**: Added carousel to ProductModal to browse all product images (designs + mockup).

**Implementation**:
- Previous/Next buttons with SVG chevron icons
- Indicator dots with active state highlighting
- Keyboard navigation (Arrow Left/Right)
- Auto-hide when only 1 image
- CSS transitions for smooth image changes

**Files Modified**:
- `src/components/ProductModal.astro`

### Bug Fix: Duplicate Images in Carousel (Commit 8447978)

**Problem**: Machine King Labs Unisex Hoodie showed same logo twice (Printful returned 2 files with identical URLs).

**Solution**: Added Set-based deduplication to filter duplicate preview URLs.

**Code Added** (ProductModal.astro):
```typescript
currentImages = [...new Set(allImages)];
```

## Deferred Features (Saved for Later)

### Manual Mockups System

**Context**: User wanted to add custom mockup photos from Printful (back views, sleeve views) to carousel but encountered download difficulties.

**Planned Implementation**:
1. Create `/public/mockups/` folder
2. Name files by product ID: `{productId}-front.png`, `{productId}-back.png`, etc.
3. Update API to check for manual mockups first, fallback to Printful data
4. Priority: Manual mockups → Printful mockups → Design files

**Products Needing Mockups**:
- Product ID 398235774 ("Upgrade or Be Overwritten") - needs back view
- "Hey You're Hired" products - need back/sleeve views
- Machine King Labs Unisex Hoodie - user will recreate in Printful

**Status**: Deferred pending user obtaining mockup images from Printful.

## Common Tasks

### Adding a New Page

1. Create `src/pages/new-page.astro`
2. Wrap content in `<Layout title="Page Title">`
3. Add navigation link in `src/layouts/Layout.astro` (lines 64-72 for desktop, 88-96 for mobile)

### Modifying Product Display

- **API data**: `src/pages/api/gear/products.ts`
- **Grid card**: `src/components/ProductCard.astro`
- **Detail modal**: `src/components/ProductModal.astro`
- **Store page**: `src/pages/gear.astro`

### Testing Locally

```bash
npm run dev
```
Visit `http://localhost:4321` (or use `npm run dev -- --host` for network access)

### Deploying to Vercel

- Push to main branch → auto-deploys
- Vercel environment variables must include:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `PRINTFUL_API_TOKEN`

## Printful API Quirks

### File Array Structure Varies

Different products return different numbers of files:
- **T-shirts/simple products**: 3 files (front, back, mockup)
- **Complex products**: 4 files (print file, front, back, mockup)

**Always use dynamic indexing**: `files[files.length - 1]` for mockup.

### Duplicate Preview URLs

Some products return multiple files with identical `preview_url` (seen with Machine King Labs Unisex Hoodie). Always deduplicate using `Set`.

### Mockup Quality

Printful doesn't always generate high-quality mockups for all products. Manual mockups may be needed for professional presentation.

## Stripe Checkout Notes

### Line Items Metadata

Product metadata is attached to Stripe products for Printful order creation:
```typescript
metadata: {
  variant_id: item.variantId.toString(),
  product_id: item.productId.toString(),
  sku: item.sku || '',
}
```

This allows webhook to reconstruct Printful order from Stripe session.

### Shipping Address Collection

Checkout session collects:
- Shipping address (allowed countries: US, CA, GB, AU, DE, FR, ES, IT, NL, BE, JP)
- Phone number
- Billing address

## Known Issues

1. **Cache Disabled**: Product API cache is currently disabled (`CACHE_TTL = 0`) - re-enable to `5 * 60 * 1000` for production performance
2. **No Color Variants**: Current implementation doesn't handle Printful color variants (products are single-color only)
3. **Manual Mockups Pending**: Some products need custom mockup images (see "Deferred Features" above)

## Navigation Structure

**Top Navigation** (fixed header):
- Home → `/`
- About → `/about`
- Portfolio → `/projects`
- Innovation Lab → `/innovation-lab`
- Team → `/team`
- Gear → `/gear` (e-commerce)
- Contact → `/contact`

**Footer Links**:
- Team Portal → `/portal`
- GitHub → `https://github.com/taskmasterpeace/machinekinglabs`
- Email → `robertsmith@machinekinglabs.com`

## Styling Patterns

### Colors

- Background: `bg-black`
- Text: `text-white`, `text-zinc-300`, `text-zinc-400`
- Borders: `border-zinc-800/50`
- Hover states: `hover:bg-zinc-900/50`, `hover:text-white`

### Layout

- Max width: `max-w-7xl mx-auto`
- Padding: `px-4 sm:px-6 lg:px-8`
- Navigation height: `h-20`
- Main content padding: `pt-20` (to account for fixed nav)

### Components

- Buttons: Rounded with hover transitions
- Modals: Fixed overlay with backdrop blur
- Cards: Border with hover elevation effects

## Testing Checklist for E-commerce Changes

When modifying product display or checkout:

1. **Product Loading**: Verify all products load correctly on `/gear`
2. **Product Images**: Check that mockup images (not design artwork) appear on cards
3. **Modal Carousel**:
   - Click product → modal opens
   - Multiple images → carousel controls appear
   - Single image → no controls
   - Navigation works (buttons, dots, keyboard)
   - No duplicate images
4. **Cart Operations**:
   - Add to cart → cart count updates
   - View cart → correct items/prices
   - Remove from cart → updates properly
5. **Checkout Flow**:
   - Checkout button → Stripe redirect
   - Test payment → success page
   - Verify webhook creates Printful order (check logs)

## Contact & Ownership

- **Company**: Machine King Labs, LLC
- **Location**: Fairfax, Virginia
- **Primary Contact**: robertsmith@machinekinglabs.com
- **GitHub**: https://github.com/taskmasterpeace/machinekinglabs
- **Website**: https://www.machinekinglabs.com

---

**Last Updated**: January 2025
**Created By**: Claude Code (Anthropic)
