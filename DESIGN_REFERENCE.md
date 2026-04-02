# Design Reference

Here is the breakdown of exactly how those design tokens were applied across the site to create the fintech/operator aesthetic:

## Colors (Backgrounds & Borders)
- `#09090b` (`bg-zinc-950`): The core global background color. Used for the deeply dark, high-contrast canvas.
- `#18181b` (`bg-zinc-900`): Used for Card backgrounds and the "mock UI" wrapper in the For Companies section, lifting them off the background.
- `#0f172a` / `#1e293b` (`border-slate-900` / `border-slate-800`): Used for all section dividers, strict table borders, and card outlines to emulate severe, terminal-style separation.
- `#022c22` (`bg-emerald-950`): Used specifically as the deep green background for the Final CTA area to draw the eye downward.

## Colors (Accents & Interactions)
- `#10b981` (`emerald-500`): the primary "Terminal Emerald" accent. Used for the flashing "0% Take Rate" badge, Check icons, pricing borders, and the "Terminal Operational" system badge in the footer.
- `#059669` (`emerald-600`): Used for the primary "Unlock Candidate" and "Get Started" buttons (deepened slightly for better white text legibility).
- `#34d399` (`emerald-400`): Used for glowing, highlighted text (e.g., italicized headline spans: "already here.")

## Colors (Typography)
- `#f8fafc` / `#f1f5f9` (`text-slate-50` / `text-slate-100`): Bright, stark white used for all primary Serif Headers (Hero, Section Titles).
- `#e2e8f0` / `#cbd5e1` (`text-slate-200` / `text-slate-300`): Used for semi-bold functional data (Card titles, data points in the AE cards).
- `#94a3b8` / `#64748b` (`text-slate-400` / `text-slate-500`): Muted grays used for explanatory paragraph body text and structural table headers to ensure it doesn't distract from the primary data.

## Typography (Fonts)
- `Playfair Display` (`font-serif`): Used exclusively for large headers (h1, h2, h3). Creates the authoritative "editorial/analyst report" vibe.
- `Geist` (`font-sans`): The global body font. Used for paragraphs, buttons, and card descriptions for maximum utilitarian legibility.
- `Geist Mono` (`font-mono`): Used for all literal "data" (Stats bar numbers, AE salary metrics, stage tags, table headers) to mimic a Bloomberg terminal interface.

## Sizing & Layout (Typography)
- `text-xs/sm` (`12-14px`): Used heavily in the "For Companies" mock table and "For AEs" data tags for dense UI presentation.
- `text-lg/xl` (`18-20px`): Sub-headlines and paragraph body text.
- `text-[5xl to 8xl]` (`48-96px`): Used to create massive, confident Hero and section headers.

## Sizing & Layout (Geometry)
- `rounded-none`: We forced sharp 0px square borders on all primary Buttons (like the "Unlock Access" CTA) to remove the friendly "startup" look and feel more rigid.
- `rounded-xl`: Used for enclosing the larger Cards (Insights, For AEs) to group information smoothly.
- `spacing-24` (`py-24` / `6rem`): The standard rigid vertical padding separating every major narrative section on the page.
