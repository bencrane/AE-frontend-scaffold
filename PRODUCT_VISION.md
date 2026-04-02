# AccountExecutive.com — Product Vision & Requirements

## What This Document Is

This is the product vision and requirements document for the AccountExecutive.com frontend application. It is written for a senior engineer/designer who will own all architectural, design, and implementation decisions. It defines the *what* and *why* — not the *how*.

A separate `DESIGN_REFERENCE.md` contains the brand's design tokens (colors, typography, spacing) extracted from the marketing site. The application should feel like the same brand built it, but it is its own product — not a copy of the marketing site.

---

## The Product

AccountExecutive.com is a premium talent marketplace for Account Executives in tech sales. It is not a job board.

The platform aggregates AE roles from across the tech ecosystem and builds enriched profiles of AE candidates — creating a two-sided marketplace where candidates evaluate opportunities with unprecedented transparency, and companies pay to access and engage that talent.

### Core Thesis

Companies don't post jobs here. Their roles already exist on the platform because we aggregate them. Their company already has a page because we built it from enriched data. The first interaction a company has with AccountExecutive.com as a *customer* is when they decide to pay. Everything before that, they're content.

Candidates come because no other platform exposes the operational reality of a sales role — quota attainment rates, average deal sizes, sales cycles, methodologies, tech stack, team structure. This is the information AEs actually need to evaluate a role, and no one else gives it to them.

### Positioning

- **Not a job board.** Job boards are spray-and-pray. This is curated, filtered, and signal-rich.
- **Not a recruiting agency.** Zero placement fees. Zero commissions (at launch). Flat subscription.
- **The reversed job board.** Companies don't post and pray. They unlock access to candidates who are actively raising their hands.

---

## The Two Sides

### Candidates (Account Executives)

**Who they are:** Mid-to-senior AEs at tech companies. They sell SaaS — enterprise, mid-market, or SMB. They think in terms of quota, OTE, deal size, sales cycle, and methodology. They evaluate roles like operators, not like job seekers.

**Why they come:** To evaluate their next move with real data. To see the roles that actually matter, with the metrics that actually matter, without the fluff of a standard job description.

**What they can do on the platform:**

1. **Onboard via LinkedIn URL.** No resume upload. Candidate submits their LinkedIn profile URL. The platform enriches it and builds their profile automatically — employment history, companies, titles, segments, tenure. The candidate reviews and confirms. This is the only onboarding step.

2. **Browse and search roles.** The primary candidate experience. Roles are searchable and filterable by: company, compensation (OTE and base), deal size, sales cycle length, quota attainment %, company stage (seed through post-IPO), segment (enterprise/mid-market/SMB), sales methodology (MEDDPICC, Challenger, Sandler, etc.), and tech stack (Salesforce, HubSpot, Gong, etc.).

3. **View role detail.** Each role has a rich detail view exposing operational metrics: comp structure, average deal size, sales cycle, quota attainment, company stage, team size, methodology, and any additional context the company has provided (if they're a paying customer). This is the "evaluate roles like an operator" experience from the marketing site.

4. **View company pages.** Every company with AE roles has a page on the platform. If the company is not a paying customer, this page is auto-generated from enriched data — basic info, open roles, and that's it. If the company pays, their page is richer (see Company side below).

5. **Signal intent.** Candidates can indicate they are "open to" certain types of opportunities — by company stage, segment, location, comp range, or specific companies. This is passive — it doesn't apply them to anything. It makes them discoverable to paying companies who match their criteria.

6. **Express interest in a role.** When a candidate wants to engage with a specific role, they can express interest. If the company is a paying customer with ATS integration, this routes directly into their ATS. If the company is not paying, the candidate sees a state indicating the company hasn't claimed their page yet (which creates pull — candidates asking companies "why aren't you on AccountExecutive.com?" is a growth loop).

### Companies (Employers)

**Who they are:** Tech companies hiring AEs. From Series A startups building their first sales team to post-IPO enterprises scaling revenue orgs. The buyer is typically a VP Sales, Head of Talent, or CRO.

**Why they come:** Because their company and roles are already on the platform, candidates are already viewing them, and they're leaving value on the table by not claiming their presence.

**What "not paying" looks like:**

The company exists on the platform. Their AE roles (the ones we chose to aggregate) are visible. They have an auto-generated company page with basic information. That's it. They have no account, no login, no dashboard. They are content, not customers. Critically: their company page may show a "Companies also hiring AEs" section featuring competitors. This is removed when they pay.

**What paying unlocks:**

1. **Claimed company page.** The company gets control of their page. They can add branding, culture content, team information, compensation philosophy, and anything else that helps them attract candidates. The auto-generated page becomes *their* page.

2. **Full role sync.** All their AE roles appear on the platform, not just the ones we happened to aggregate. They can connect their ATS or career page and keep everything current automatically.

3. **Candidate intent routing.** When candidates express interest or apply to their roles, applications flow directly into their ATS (Greenhouse, Lever, Ashby, Rippling, BambooHR) via API integration. This is the core unlock — without paying, candidate interest goes nowhere.

4. **Candidate browsing.** Paying companies can browse the candidate pool. Candidate profiles are anonymized until unlocked — the company can see title, segment, company tier, years of experience, and methodology, but not the candidate's name or specific employer until they unlock the profile.

5. **Unlock mechanic.** Companies unlock individual candidate profiles to see full details. Depending on pricing tier, they get a set number of unlocks per month or unlimited unlocks. Unlocking pushes the candidate's full profile directly into their ATS.

6. **Competitor removal.** The "Companies also hiring AEs" section is removed from their company page. No more sending traffic to competitors.

7. **Activity analytics.** Dashboard showing: how many candidates viewed their roles, how many saved them, how many expressed interest, how many profiles were unlocked, and pipeline activity over time.

---

## Pricing

Two tiers at launch. Flat monthly subscription. No placement fees. No commissions. Framed as launch pricing — implying the economics will evolve.

**Starter — $299/month**
- 1 active job opening on platform
- Up to 20 candidate unlocks per month
- Standard candidate filtering
- Basic ATS sync (CSV/email export)
- 0% placement fees

**Growth — $699/month**
- Unlimited active job openings
- Unlimited candidate unlocks
- Advanced pedigree filtering (by specific companies, CRO lineage, VC backing, etc.)
- Native API ATS sync (Greenhouse, Lever, Ashby, etc.)
- Dedicated account manager
- 0% placement fees

Launch promotion: code LAUNCH for 40% off first 3 months.

### Design Principle: The Rippling Problem

A company like Rippling might have 100+ AE roles. A Series A startup has 2. The platform must not let large companies dominate the attention space. This is a product design challenge — search ranking, result diversity, filtering UX, and possibly editorial curation should all account for this. The goal is that a great role at a 50-person startup is just as discoverable as a role at a 10,000-person company.

---

## Core Platform Mechanics

### Role Aggregation

Roles are aggregated by the platform using external data sources (TheirStack, Clay, career page scraping). Companies do not post roles. The platform decides what to feature. When a company becomes a paying customer, they gain the ability to sync all their roles and keep them current — but the platform always retains editorial control over what appears.

### Profile Enrichment

Candidate profiles are built from LinkedIn data, enriched automatically. Employment history, titles, companies, tenure, and segment focus are extracted and structured. The candidate confirms accuracy during onboarding. The platform may further enrich with publicly available data (company funding stage, team size at time of employment, etc.) to add context.

### Anonymization & Unlocking

Candidates appear in the browse/search experience in an anonymized state. Paying companies can see: title level (Senior AE, Enterprise AE, Strategic AE), segment (enterprise/mid-market/SMB), company tier and stage (but not company name), years of experience, methodology tags, and a general performance indicator. Name, specific employer, LinkedIn, and contact info are hidden until the company unlocks the profile. Unlocking is the monetization lever.

### ATS Integration

The platform integrates with major ATS platforms: Greenhouse, Lever, Ashby, Rippling, BambooHR. When a candidate is unlocked or expresses interest, their structured profile data is pushed directly into the company's ATS as a new candidate record. This is not a link or a PDF — it's a native API integration that creates a real candidate in their pipeline. For Starter tier, this is a CSV/email export. For Growth tier, this is a live API sync.

### Intent Signaling

Candidates can passively signal what they're open to without applying to specific roles. This creates a matchmaking layer: companies browsing the candidate pool can filter by candidates whose intent signals align with what they're offering. Intent signals might include: target company stage, target segment, target comp range, geographic preferences, and specific companies of interest.

---

## Content & Editorial: Carrying Quota

The platform includes a content hub branded as the Insights section, anchored by a podcast called **Carrying Quota**. The podcast features interviews with VP Sales, CROs, and revenue leaders. This content serves multiple purposes:

- Builds credibility with both sides of the marketplace
- Drives organic traffic and SEO
- Creates a reason to reach out to companies you want on the platform (book their CRO on the podcast → now you have a relationship → convert them to a paying customer)
- Feeds editorial content on the platform: Company Spotlights, Compensation Data analysis, Leadership Moves tracking

Content categories on the platform:
- **Company Spotlight** — analysis of a company's GTM strategy, territory planning, growth trajectory
- **Compensation Data** — aggregated OTE/base data across segments, stages, and company types
- **Leadership Moves** — tracking where top revenue leaders are going and what it signals

---

## Key Application Surfaces

The following are the primary views/pages the frontend application needs to support. Each is described by its purpose and what it must accomplish — not by layout or component structure.

### Public Surfaces (no auth required)

1. **Role Browse / Search** — The primary entry point for candidates. A searchable, filterable index of all AE roles on the platform. Must feel fast, dense with signal, and immediately useful. This is the page that proves the platform's value in 5 seconds.

2. **Role Detail** — Expanded view of a single role showing all operational metrics: comp, deal size, sales cycle, quota attainment, stage, methodology, team context. If the company is a paying customer, this page is richer. If not, it's still more useful than any job description on LinkedIn.

3. **Company Page** — Every company with AE roles has a page. Auto-generated for non-paying companies (basic info, open roles, "Companies also hiring" competitor section). Rich and editable for paying companies (branding, culture, team, comp philosophy, no competitor section).

4. **Insights Hub** — The content section. Blog posts, Carrying Quota podcast episodes, data analysis. Organized by content category (Company Spotlight, Compensation Data, Leadership Moves).

5. **Marketing / Landing Pages** — How It Works, For Companies, For AEs, Pricing. These already exist on the marketing site but may need to live within the app shell for navigation continuity.

### Candidate Surfaces (authenticated)

6. **Candidate Onboarding** — LinkedIn URL submission → enrichment processing → profile review and confirmation. Should feel effortless — the platform does the work, the candidate just validates.

7. **Candidate Profile** — The candidate's view of their own profile. Shows what companies will see (anonymized preview) and what gets revealed on unlock. Candidate can edit, add context, update intent signals.

8. **Candidate Dashboard** — Activity feed: which companies viewed their anonymized profile, how many times their profile appeared in search results, any role matches based on their intent signals. Light touch — this isn't a full analytics suite, it's awareness.

9. **Intent Signal Settings** — Where candidates configure their "open to" preferences: company stage, segment, comp range, geography, specific companies. This feeds the matchmaking layer.

### Company Surfaces (authenticated, paying)

10. **Company Onboarding / Claim Flow** — Company discovers they're already on the platform → guided flow to claim their page, set up billing, connect ATS. This is the conversion moment — it should feel premium and frictionless.

11. **Company Dashboard** — The command center. Pending candidate approvals, recent applications, profile views, unlock history, pipeline activity. The "Pending Approvals" UI from the marketing site mockup captures the feel — a queue of anonymized candidates with unlock actions.

12. **Company Page Editor** — Where paying companies customize their public-facing page: branding, team info, culture content, comp philosophy, open roles management.

13. **Candidate Browse / Search** — Company-side search of the candidate pool. Anonymized profiles with filters: title level, segment, company tier, years of experience, methodology, intent signals. Unlocking reveals the full profile.

14. **ATS Integration Settings** — Connect and configure ATS integration (Greenhouse, Lever, Ashby, Rippling, BambooHR). Manage sync preferences, field mapping, and test the connection.

15. **Billing & Subscription** — Plan management, payment method, invoice history. Standard SaaS billing UI.

---

## Design Principles

These are not visual design rules — they're product design principles that should inform every decision.

1. **Signal over noise.** Every element on every page should be there because it helps someone make a decision. If it doesn't inform a candidate's evaluation of a role or a company's evaluation of a candidate, it doesn't belong.

2. **Density with clarity.** AEs are data-literate. They want to see metrics, not marketing copy. The UI should be information-dense without being cluttered. Think Bloomberg Terminal energy applied to career decisions — not literally, but in spirit.

3. **The platform has an opinion.** This is not a neutral aggregator. The platform curates, ranks, and editorializes. The design should reflect confidence and authority, not generic marketplace neutrality.

4. **Premium by default.** The domain is AccountExecutive.com. The brand is dark, serif, green accents. The experience should feel like a product built for people who close six- and seven-figure deals — not a product built for entry-level job seekers.

5. **Asymmetric value display.** Candidates see everything about roles. Companies see anonymized candidates until they pay and unlock. The UI should make this asymmetry feel natural and intentional, not punitive or gated.

6. **Discoverability balance.** A great role at a 50-person Series A startup must be just as discoverable as one at Salesforce. Search, filtering, and default sort order should actively resist large-company dominance.

---

## What This PRD Does Not Cover

- Backend architecture, API design, or database schema
- Data aggregation pipeline implementation (TheirStack, Clay, enrichment)
- ATS integration implementation details
- Marketing site (exists separately)
- Mobile app (web-first)
- Admin/internal tooling

---

## Summary

Build a two-sided talent marketplace frontend where:

- **Candidates** find AE roles with real operational data, build profiles from LinkedIn enrichment, signal intent, and express interest — with applications routing directly into company ATS systems.
- **Companies** discover they already exist on the platform, pay to claim their presence, unlock anonymized candidates, and manage their pipeline through native ATS integration.
- **The platform** aggregates roles, enriches profiles, enforces anonymization, and earns revenue through flat monthly subscriptions with zero placement fees.

The brand is premium. The data is dense. The experience is fast. Make strong decisions.
