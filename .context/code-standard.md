# Code Standards



## 1. Technical Framework Rules
- Use **Next.js App Router** patterns exclusively.
- Use **TypeScript** strictly; avoid the use of `any` types.
- Prioritize **Next.js Server Actions** for handling form submissions and mutations directly with Supabase.


## 2. Directory and File Layout Rules
- All reusable components must sit inside `@/components/ui/` (managed via shadcn).
- Custom components copied or adapted from **Untitled UI** must be placed in a separate folder path, such as `@/components/untitled-ui/`, to keep the codebase clean and distinct.
- Keep business components separate in folder paths like `@/components/landlord/` and `@/components/tenant/`.
- Isolate external API logic (Smile ID, Google Vision) inside dedicated service wrappers inside a `@/lib/services/` directory.


## 3. State Management & Security
- Never expose sensitive API keys on the client-side frontend; all third-party verification API calls must execute within server environments using process environment variables (`process.env`).
