# Progress Tracker & Project Roadmap



## Phase 1: Local Project Foundation & Workspace
- [x] Create core workspace context documents in the `.context/` directory
- [x] Initialize Next.js App Router project with TypeScript
- [x] Install and configure Tailwind CSS and shadcn/ui foundations


## Phase 2: Database Layer & Supabase Integration
- [ ] Initialize free Supabase project backend
- [ ] Execute core PostgreSQL database schema tables (`profiles`, `properties`, `property_images`)
- [ ] Configure Supabase Authentication roles (`tenant` vs `landlord`)


## Phase 3: Landlord Shield (Identity Verification Sandbox)
- [ ] Set up localized configuration keys for Smile ID Sandbox
- [ ] Build the Next.js server route to receive Smile ID validation responses
- [ ] Construct the multi-step verification interface for landlord document submittals


## Phase 4: Anti-Scam Upload Verification Pipeline
- [ ] Set up Google Cloud Vision project API variables
- [ ] Implement backend check routines for image Web Detection and Text OCR scanning
- [ ] Create automated flag workflows to drop internet stock photos


## Phase 5: Platform Frontend Development (Tenant / Landlord UX)
- [ ] Build tenant housing search index interfaces with layout filters
- [ ] Construct landlord properties inventory dashboards
- [ ] Integrate interactive map layouts for localization features

---

