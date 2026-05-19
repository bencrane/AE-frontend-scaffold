<!-- BEGIN:vite-spa-agent-rules -->
# This is a Vite + React SPA — no Next.js, no SSR, no app router

- `vite build` produces static files in `dist/`; `serve dist -s` serves them with SPA-mode rewrites.
- All auth is client-side via `@/lib/supabase` (PKCE flow). No server-side auth callback route exists.
- Routes live under `src/routes/` and are wired in `src/App.tsx` via `react-router-dom`.
- Public env vars are read via `import.meta.env.VITE_*` and MUST be baked at build time.
- Tailwind v4 is wired via the `@tailwindcss/vite` Vite plugin (not PostCSS). `src/index.css` starts with `@import "tailwindcss";`.
- Deploy target: Railway service `platform-app` on project `account-executive-dot-com`. Custom domain `app.accountexecutive.com`. Auto-deploy on push to `main`.
<!-- END:vite-spa-agent-rules -->
