# Architecture Context



## 1. Core Tech Stack
- **Frontend / Meta-Framework:** Next.js (App Router), TypeScript.
- **Mobile Target (Future):** React Native (aiming for ~70% code reuse).
- **Backend / Database Platform:** Supabase (PostgreSQL engine).
- **UI & Styling:** Tailwind CSS, Radix UI, and shadcn/ui components.


## 2. Third-Party Verification Infrastructure
- **Identity Verification (eKYC):** Smile ID API (Sandbox for development, checking against Kenyan IPRS / National ID & Passport databases with biometric liveness checks).
- **Image Scam & Copy-Paste Prevention:** Google Cloud Vision API. Features to use:
  - `Web Detection` (to match against Unsplash, Airbnb, etc.).
  - `Text Detection / OCR` (to spot text overlays like fraudulent WhatsApp numbers).
  - `Safe Search` (to block explicit content).
- **Land Ownership Validation:** Handled via a Human-in-the-Loop (HITL) system. System reads uploaded PDF Title Deeds/Searches via basic OCR, extracts L.R. Parcel Numbers, and flags them for admin manual approval on Ardhisasa.
- **Payments / Escrow Engine (Future Integration):** M-Pesa automated APIs via Daraja / Africa's Talking or third-party gateways (Pesapal / DPO Group) to hold booking deposits safely in escrow.


## 3. Database Extensions
- **PostGIS:** Must be enabled in PostgreSQL via Supabase for geospatial radius queries (e.g., searching properties near a user's location).

