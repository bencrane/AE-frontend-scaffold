#!/usr/bin/env node
// Seed two dev users + one paying company.
//
// Idempotent — re-running is safe; existing rows are detected by natural keys
// (auth.users.email, public.companies.slug, public.company_members
// (user_id, company_id)) and skipped or updated, never duplicated.
//
// Usage:
//   doppler run --project hq-ae-dot-com --config prd -- \
//     node scripts/seed-dev-users.mjs
//
// Requires env:
//   NEXT_PUBLIC_SUPABASE_URL
//   AE_SUPABASE_SERVICE_ROLE_KEY
//
// Created users (passwords printed at end so operator can copy):
//   1. candidate1@accountexecutive.test   — kind=candidate
//   2. recruiter1@accountexecutive.test   — kind=company_member, admin at Stripe
//
// The company "Stripe" is created with is_claimed=true + is_subscribed=true so
// the recruiter user lands as an admin at a paying customer.

import { createClient } from '@supabase/supabase-js';

const DEV_PASSWORD = 'testing123!';

const USERS = [
  {
    email: 'candidate1@accountexecutive.test',
    password: DEV_PASSWORD,
    metadata: {
      kind: 'candidate',
      first_name: 'Jordan',
      last_name: 'Reyes',
    },
    profile: {
      headline: 'Senior Enterprise AE',
      linkedin_url: 'https://www.linkedin.com/in/jordan-reyes-fake/',
    },
  },
  {
    email: 'recruiter1@accountexecutive.test',
    password: DEV_PASSWORD,
    metadata: {
      kind: 'company_member',
      first_name: 'Casey',
      last_name: 'Park',
    },
    profile: {
      headline: 'Head of Talent at Stripe',
      linkedin_url: 'https://www.linkedin.com/in/casey-park-fake/',
    },
  },
];

const COMPANY = {
  name: 'Stripe',
  slug: 'stripe',
  domain: 'stripe.com',
  website_url: 'https://stripe.com',
  linkedin_url: 'https://www.linkedin.com/company/stripe/',
  hq_location: 'San Francisco, CA',
  size_range: '5001-10000',
  industry: 'Fintech / Payments',
  is_claimed: true,
  is_subscribed: true,
};

function need(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing required env: ${name}`);
    process.exit(64);
  }
  return v;
}

async function findUserByEmail(admin, email) {
  // listUsers paginates; we iterate until we find or exhaust.
  let page = 1;
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const hit = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (hit) return hit;
    if (data.users.length < 200) return null;
    page += 1;
  }
}

async function ensureUser(admin, spec) {
  const existing = await findUserByEmail(admin, spec.email);
  if (existing) {
    // Refresh password + metadata so re-runs are idempotent in both directions
    // (including a password rotation across re-runs).
    const { error } = await admin.auth.admin.updateUserById(existing.id, {
      password: spec.password,
      user_metadata: spec.metadata,
    });
    if (error) throw error;
    console.log(`[users] ${spec.email} already exists → ${existing.id} (password + metadata refreshed)`);
    return existing.id;
  }
  const { data, error } = await admin.auth.admin.createUser({
    email: spec.email,
    password: spec.password,
    email_confirm: true,
    user_metadata: spec.metadata,
  });
  if (error) throw error;
  console.log(`[users] created ${spec.email} → ${data.user.id}`);
  return data.user.id;
}

async function ensureProfile(admin, userId, spec) {
  // handle_new_user trigger seeds the row with kind/email/first_name/last_name.
  // We layer on headline + linkedin_url + any cosmetic fields.
  const { error } = await admin
    .from('profiles')
    .update({
      headline: spec.profile.headline ?? null,
      linkedin_url: spec.profile.linkedin_url ?? null,
    })
    .eq('user_id', userId);
  if (error) throw error;
}

async function ensureCompany(admin) {
  const { data: existing, error: lookupErr } = await admin
    .from('companies')
    .select('id')
    .eq('slug', COMPANY.slug)
    .maybeSingle();
  if (lookupErr) throw lookupErr;
  if (existing) {
    const { error: updErr } = await admin
      .from('companies')
      .update({
        name: COMPANY.name,
        domain: COMPANY.domain,
        website_url: COMPANY.website_url,
        linkedin_url: COMPANY.linkedin_url,
        hq_location: COMPANY.hq_location,
        size_range: COMPANY.size_range,
        industry: COMPANY.industry,
        is_claimed: COMPANY.is_claimed,
        is_subscribed: COMPANY.is_subscribed,
      })
      .eq('id', existing.id);
    if (updErr) throw updErr;
    console.log(`[company] ${COMPANY.slug} already exists → ${existing.id} (refreshed)`);
    return existing.id;
  }
  const { data: ins, error: insErr } = await admin
    .from('companies')
    .insert(COMPANY)
    .select('id')
    .single();
  if (insErr) throw insErr;
  console.log(`[company] created ${COMPANY.slug} → ${ins.id}`);
  return ins.id;
}

async function ensureCompanyMember(admin, userId, companyId, role) {
  const { error } = await admin
    .from('company_members')
    .upsert(
      { user_id: userId, company_id: companyId, role },
      { onConflict: 'user_id,company_id', ignoreDuplicates: false },
    );
  if (error) throw error;
  console.log(`[member] ${userId} @ company ${companyId} = ${role}`);
}

async function main() {
  const supabaseUrl = need('NEXT_PUBLIC_SUPABASE_URL');
  const serviceKey = need('AE_SUPABASE_SERVICE_ROLE_KEY');
  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const [candidateId, recruiterId] = await Promise.all(
    USERS.map((u) => ensureUser(admin, u)),
  );

  await Promise.all([
    ensureProfile(admin, candidateId, USERS[0]),
    ensureProfile(admin, recruiterId, USERS[1]),
  ]);

  const companyId = await ensureCompany(admin);
  await ensureCompanyMember(admin, recruiterId, companyId, 'admin');

  console.log('');
  console.log('Seed complete. Sign in via /dev-login with either:');
  console.log(`  email: ${USERS[0].email}   password: ${DEV_PASSWORD}   (candidate / AE)`);
  console.log(`  email: ${USERS[1].email}   password: ${DEV_PASSWORD}   (company_member @ ${COMPANY.name}, subscribed)`);
}

main().catch((err) => {
  console.error('seed failed:', err);
  process.exit(1);
});
