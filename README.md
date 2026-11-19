# Pakwood Furniture — Ultra-Premium Static E-Commerce & Catalog

[![Deploy Pakwood Furniture to GitHub Pages](https://github.com/user/pakwood-furniture/actions/workflows/deploy.yml/badge.svg)](https://github.com/user/pakwood-furniture/actions/workflows/deploy.yml)

**Pakwood Furniture** (`Handcrafted Elegance & Modern Comfort for Homes & Offices`) is an ultra-premium, high-converting, fully static e-commerce catalog website engineered for direct deployment on **GitHub Pages**.

Showroom & Workshop: **Hussain Agahi Market, Multan, Punjab, Pakistan**  
Direct WhatsApp Concierge & Ordering: **03217324620** (`https://wa.me/923217324620`)

---

## 🏛️ Brand & Architectural Overview

Pakwood Furniture combines the warm editorial aesthetic, authentic Pakistani market pricing, and local timber specifications of **`roco.pk`** with the modern luxury whitespace, tactile micro-interactions, and refined typography of **`hernest.com`**.

- **Color Palette:**
  - Primary Background: Warm Alabaster (`#FAF8F5`) & Crisp White (`#FFFFFF`)
  - Accent / Wood: Warm Walnut (`#5C4033`) & Seasoned Sheesham (`#8B5A2B`)
  - Accent Metals: Antique Muted Brass (`#B08D57`)
  - Dark Surfaces: Espresso Charcoal (`#181513`)
  - WhatsApp Brand: `#25D366`
- **Typography:**
  - Headings: *Cormorant Garamond* & *Playfair Display*
  - Body & Badges: *Plus Jakarta Sans*
  - Pricing: `tabular-nums`
- **Logo Design:**
  - Custom geometric architectural SVG vector logo (`pakwood-logo.svg` & `pakwood-logo-dark.svg`) featuring interlocking mortise-and-tenon timber joinery paired with refined serif typography.

---

## ✨ Core Features & Pages

1. **Editorial Home Page (`/`)**:
   - **Announcement Bar:** *"Handcrafted in Multan • Nationwide Delivery Across Pakistan • Custom Sizes & Finishes Available"*
   - **Sticky Luxury Header:** Custom SVG logo, Mega-Menu (`Shop`, `Sofas`, `Bedroom`, `Chairs`, `Dining`, `Office`, `Custom Order`), Live Instant Search Modal, and Wishlist drawer (persisted in `localStorage`).
   - **Full-Bleed Hero:** High-resolution living room visual, headline *"Premium Furniture In Pakistan For Homes & Offices"*, and dual CTAs (*Explore Collection* + *WhatsApp Custom Quote*).
   - **Shop by Room Carousel:** Living Room, Master Bedroom, Accent Chairs, Dining Rooms, Executive Office, and English Chesterfield.
   - **Curated Product Grids:** 40+ products across Sofas, Beds, Chairs, Dining, and Office with image hover swap, quick-view modal, and direct "Order on WhatsApp" button.
   - **Interactive Custom Furniture Banner:** Room measurement & finish calculator (Length × Width in feet, wood type, and upholstery grade) that compiles user inputs into a structured quote and launches WhatsApp directly.
   - **3-Step Ordering Process:** Transparent milestones (Choose piece → Written dimensions & fabric samples → Multan production & HD video approval prior to dispatch).
   - **Verified Customer Reviews:** Authentic feedback from patrons in Lahore, Islamabad, Karachi, Multan, and Faisalabad.
   - **Interactive FAQ Accordion:** Custom orders, 70/30 advance payment policy, 10-14 day lead times, and 10-year timber warranty.
   - **Luxury Footer:** Multan address (*Hussain Agahi Market, Multan*), direct telephone, WhatsApp links, and category navigation.
2. **Collection / Category Filtering Page (`/#/collections`)**:
   - Multi-facet live filtering by Category, Room Ambience, Material/Upholstery (Sheesham, Velvet, Bouclé, Leatherite), Price Range slider (₨ 35,000 – ₨ 265,000), and Sorting (Featured, Low to High, High to Low, Highest Rated).
3. **Product Detail View (`/#/product/[slug]`)**:
   - Multi-image gallery with zoom and thumbnails.
   - Fabric & Wood finish swatch selector with live swatch indicator.
   - Dimensions & Specs table (Inches: L × D × H, Seating Height).
   - 70% Production Advance / 30% on Dispatch payment breakdown.
   - Related products carousel.
   - Prominent **"Inquire / Order on WhatsApp"** button pre-filled with SKU, title, selected swatch, price, and inquiry query.
4. **Wishlist Drawer (`localStorage`)**:
   - Persistent wishlist across sessions with combined PKR total and one-click "Inquire All on WhatsApp" button.
5. **Floating WhatsApp Concierge**:
   - Always-accessible pulsating bottom-right button with welcome tooltip.
6. **Mobile Bottom Navigation Bar**:
   - Sticky mobile bar with quick access to Home, Catalog, Live Search, Wishlist, and WhatsApp.

---

## 🚀 GitHub Pages Deployment Ready

- Configured with relative asset paths (`base: './'`) in `vite.config.js`.
- Client-side Hash Routing (`/#/`, `/#/collections`, `/#/product/:slug`) guarantees **zero 404 errors** on page refresh or direct deep-linking on GitHub Pages subpaths or custom domains.
- Automated CI/CD deployment workflow included in `.github/workflows/deploy.yml`.

---

## 🛠️ Installation & Build

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build production static bundle for GitHub Pages
npm run build

# Preview production build locally
npm run preview
```
