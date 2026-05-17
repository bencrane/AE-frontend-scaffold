-- AccountExecutive.com — initial schema (bones).
--
-- Three core entities:
--   profiles         — 1:1 with auth.users; universal user-profile primitive.
--                       `kind` enum distinguishes 'candidate' (AE) from
--                       'company_member' (company-side recruiter / admin).
--   companies        — employer entities. May exist BEFORE any user claims
--                       them (auto-generated from enriched data per PRD).
--                       `is_claimed` flips when a company-side user takes
--                       ownership; `is_subscribed` is the paying-customer gate.
--   company_members  — user × company join; tracks which company-side users
--                       belong to which companies, with intra-company role.
--
-- Triggers:
--   handle_new_user        — auto-creates a profiles row when auth.users gets
--                            an insert, reading `kind` from raw_user_meta_data
--                            (default 'candidate').
--   set_updated_at         — touches updated_at on every UPDATE.
--
-- RLS is enabled on all three. Policies are MVP-shape and will tighten as
-- the candidate-anonymization + subscription gating mature.
--
-- Apply via:
--   doppler run --project hq-ae-dot-com --config prd -- \
--     bash -c 'psql "$AE_DB_DIRECT_URL" -v ON_ERROR_STOP=1 -f migrations/20260516220000_ae_initial.sql'

BEGIN;

-- ============================================================================
-- updated_at helper
-- ============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

-- ============================================================================
-- profiles
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  user_id      uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  kind         text NOT NULL CHECK (kind IN ('candidate', 'company_member', 'admin')),
  email        text NOT NULL,
  first_name   text,
  last_name    text,
  avatar_url   text,
  linkedin_url text,
  headline     text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS profiles_kind_idx ON public.profiles (kind);
CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_lower_idx
  ON public.profiles (LOWER(email));

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- companies
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.companies (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  slug          text NOT NULL UNIQUE,
  domain        text UNIQUE,
  logo_url      text,
  website_url   text,
  linkedin_url  text,
  description   text,
  hq_location   text,
  -- Size buckets per PRD's "stage" framing — keep flexible, app-layer enum.
  size_range    text,
  industry      text,
  -- Auto-generated (false) vs claimed (true) per the PRD "company page" model.
  is_claimed    boolean NOT NULL DEFAULT false,
  -- Subscription gate (paying-customer features per the PRD monetization spec).
  is_subscribed boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS companies_is_claimed_idx ON public.companies (is_claimed);
CREATE INDEX IF NOT EXISTS companies_is_subscribed_idx ON public.companies (is_subscribed);

DROP TRIGGER IF EXISTS companies_set_updated_at ON public.companies;
CREATE TRIGGER companies_set_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- company_members
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.company_members (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id  uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  role        text NOT NULL DEFAULT 'member'
                CHECK (role IN ('admin', 'recruiter', 'member')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, company_id)
);

CREATE INDEX IF NOT EXISTS company_members_company_idx ON public.company_members (company_id);
CREATE INDEX IF NOT EXISTS company_members_user_idx    ON public.company_members (user_id);

-- ============================================================================
-- handle_new_user — auto-create profiles row on auth.users INSERT
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  resolved_kind text;
BEGIN
  resolved_kind := COALESCE(NEW.raw_user_meta_data->>'kind', 'candidate');
  IF resolved_kind NOT IN ('candidate', 'company_member', 'admin') THEN
    resolved_kind := 'candidate';
  END IF;

  INSERT INTO public.profiles (user_id, kind, email, first_name, last_name)
  VALUES (
    NEW.id,
    resolved_kind,
    NEW.email,
    NULLIF(NEW.raw_user_meta_data->>'first_name', ''),
    NULLIF(NEW.raw_user_meta_data->>'last_name', '')
  )
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- RLS
-- ============================================================================

ALTER TABLE public.profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_members ENABLE ROW LEVEL SECURITY;

-- profiles: any authenticated user can read any profile (browse discoverability
-- pre-anonymization is app-layer); users can update only their own row.
DROP POLICY IF EXISTS profiles_select_authenticated ON public.profiles;
CREATE POLICY profiles_select_authenticated
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS profiles_update_own ON public.profiles;
CREATE POLICY profiles_update_own
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- companies: public-readable (auto-generated pages must surface to anon visitors
-- per PRD). UPDATE only by company admins (members with role='admin').
DROP POLICY IF EXISTS companies_select_anyone ON public.companies;
CREATE POLICY companies_select_anyone
  ON public.companies
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS companies_update_admins ON public.companies;
CREATE POLICY companies_update_admins
  ON public.companies
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.company_members cm
      WHERE cm.company_id = companies.id
        AND cm.user_id    = auth.uid()
        AND cm.role       = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.company_members cm
      WHERE cm.company_id = companies.id
        AND cm.user_id    = auth.uid()
        AND cm.role       = 'admin'
    )
  );

-- company_members: a user can see their own memberships; company admins can see
-- all members of their company. Writes are service-role only for MVP — the app
-- mediates company-onboarding via server-side route handlers.
DROP POLICY IF EXISTS company_members_select_self_or_admin ON public.company_members;
CREATE POLICY company_members_select_self_or_admin
  ON public.company_members
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.company_members cm
      WHERE cm.company_id = company_members.company_id
        AND cm.user_id    = auth.uid()
        AND cm.role       = 'admin'
    )
  );

COMMIT;
