# UI Context & Component Standards



## 1. Design System & Libraries
- Core interactive components (Buttons, Dialogs, Dropdowns, Inputs) are handled via **shadcn/ui**.
- Advanced dashboard layouts, complex real estate filters, metrics cards, and specific data visualizations are adapted from **Untitled UI**.
- Both systems must share the same Tailwind CSS color palette and typography rules to maintain a seamless user experience.


## 2. Core User Flows (The Rules)

### The Landlord Onboarding Wall:
- Landlords must NOT be allowed to view the "Create Listing" form until their profile `verification_status` is equal to `verified`.
- The onboarding flow must be a multi-step component wizard using shadcn layouts.


### Image Upload Guidelines:
- Any component accepting images must explicitly show a loading state while Google Cloud Vision runs its background web detection processes.


## 3. Specific Component Blueprints Required
- **Tenant View:** Search bar with map integration, category filtering tabs (hostels, plots, bungalows), clean property grid cards with "Verified Owner" badges.
- **Landlord View:** Metrics dashboard (Views, Bookings, Earnings), ID verification status alert banners, and structured listing submission forms.
