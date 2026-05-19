/**
 * credentials-api.ts — typed wrapper around ae-platform-api credential endpoints.
 * Reads VITE_AE_API_URL (baked at build time by Vite).
 * All requests include the Supabase JWT from the active session.
 */
import { supabase } from "@/lib/supabase";

const AE_API_URL = import.meta.env.VITE_AE_API_URL as string;

if (!AE_API_URL) {
  throw new Error(
    "Missing VITE_AE_API_URL — must be set as a Railway BUILD var on platform-app.",
  );
}

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SignUploadResponse {
  upload_id: string;
  signed_url: string;
  method: "PUT" | "POST";
  headers: Record<string, string>;
}

export interface ParseResponse {
  upload_id: string;
  status: "parsed" | "failed";
  credential_ids: string[];
}

export interface Credential {
  id: string;
  kind: string;
  period_start: string | null;
  period_end: string | null;
  verification_tier: string;
  captured_at: string;
  source: string | null;
  value_json?: Record<string, unknown>;
}

export interface PlaidLinkTokenResponse {
  link_token: string;
}

export interface PlaidExchangeResponse {
  connection_id: string;
  credential_ids: string[];
}

// ---------------------------------------------------------------------------
// Endpoint wrappers
// ---------------------------------------------------------------------------

export async function signUpload(
  filename: string,
  mimeType: string,
  byteSize: number,
): Promise<SignUploadResponse> {
  const res = await fetch(`${AE_API_URL}/api/v1/credentials/uploads/sign`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify({ filename, mime_type: mimeType, byte_size: byteSize }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`signUpload failed ${res.status}: ${body}`);
  }
  return res.json() as Promise<SignUploadResponse>;
}

export async function triggerParse(uploadId: string): Promise<ParseResponse> {
  const res = await fetch(
    `${AE_API_URL}/api/v1/credentials/uploads/${encodeURIComponent(uploadId)}/parse`,
    { method: "POST", headers: await authHeaders() },
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`triggerParse failed ${res.status}: ${body}`);
  }
  return res.json() as Promise<ParseResponse>;
}

export async function listCredentials(): Promise<Credential[]> {
  const res = await fetch(`${AE_API_URL}/api/v1/credentials`, {
    headers: await authHeaders(),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`listCredentials failed ${res.status}: ${body}`);
  }
  return res.json() as Promise<Credential[]>;
}

export async function getCredential(id: string): Promise<Credential> {
  const res = await fetch(
    `${AE_API_URL}/api/v1/credentials/${encodeURIComponent(id)}`,
    { headers: await authHeaders() },
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`getCredential failed ${res.status}: ${body}`);
  }
  return res.json() as Promise<Credential>;
}

export async function createPlaidLinkToken(): Promise<PlaidLinkTokenResponse> {
  const res = await fetch(`${AE_API_URL}/api/v1/credentials/plaid/link-token`, {
    method: "POST",
    headers: await authHeaders(),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`createPlaidLinkToken failed ${res.status}: ${body}`);
  }
  return res.json() as Promise<PlaidLinkTokenResponse>;
}

export async function exchangePlaidPublicToken(
  publicToken: string,
): Promise<PlaidExchangeResponse> {
  const res = await fetch(`${AE_API_URL}/api/v1/credentials/plaid/exchange`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify({ public_token: publicToken }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`exchangePlaidPublicToken failed ${res.status}: ${body}`);
  }
  return res.json() as Promise<PlaidExchangeResponse>;
}
