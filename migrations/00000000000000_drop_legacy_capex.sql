-- Drop the 18 capital-expansion public.* tables. Schema preserved in
-- bencrane/capital-expansion commit 753dbf2 (schema.sql + full.dump).
-- Apply via:
--   doppler run --project hq-ae-dot-com --config prd -- \
--     bash -c 'psql "$AE_DB_DIRECT_URL" -v ON_ERROR_STOP=1 -f migrations/00000000000000_drop_legacy_capex.sql'

BEGIN;

-- Children first (defensive — capex public.* had no cross-table FKs per the
-- snapshot's foreign_keys.json, but CASCADE keeps the drop idempotent regardless).
DROP TABLE IF EXISTS public.borrower_intent_events CASCADE;
DROP TABLE IF EXISTS public.borrower_intents       CASCADE;
DROP TABLE IF EXISTS public.borrowers              CASCADE;

DROP TABLE IF EXISTS public.intro_requests         CASCADE;
DROP TABLE IF EXISTS public.match_documents        CASCADE;
DROP TABLE IF EXISTS public.match_messages         CASCADE;
DROP TABLE IF EXISTS public.match_outcomes         CASCADE;
DROP TABLE IF EXISTS public.match_stage_events     CASCADE;
DROP TABLE IF EXISTS public.match_thread_views     CASCADE;
DROP TABLE IF EXISTS public.matches                CASCADE;

DROP TABLE IF EXISTS public.origination_invoices   CASCADE;
DROP TABLE IF EXISTS public.pending_intents        CASCADE;
DROP TABLE IF EXISTS public.setup_fee_payments     CASCADE;
DROP TABLE IF EXISTS public.stripe_events          CASCADE;

DROP TABLE IF EXISTS public.partner_inquiries      CASCADE;
DROP TABLE IF EXISTS public.partner_specs          CASCADE;
DROP TABLE IF EXISTS public.partner_subscriptions  CASCADE;
DROP TABLE IF EXISTS public.partners               CASCADE;

COMMIT;
