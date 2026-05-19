/**
 * /ae/credentials — AE verified credentials page.
 *
 * Features:
 *   - Lists own verified credentials (table: kind | period | verification_tier | captured_at | source)
 *   - Upload CSV button: file picker → sign → PUT to signed URL → trigger parse → refetch
 *   - Connect Plaid button: fetch link token → open Plaid Link → exchange → refetch
 *   - Grayed-out partner buttons: Rippling, CaptivateIQ, Spiff, Generic ATS (coming soon)
 *
 * Sentinel (s6 bundle check):
 *   data-marker="ae-credentials-v1"
 */
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
  listCredentials,
  signUpload,
  triggerParse,
  type Credential,
} from "@/lib/credentials-api";
import { useAePlaidLink } from "@/lib/plaid";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sentinel value for s6 bundle verification.
export const AE_CREDENTIALS_ROUTE_MARKER = "ae-credentials-v1";

const ACCEPTED_MIME_TYPES = ["text/csv", "application/pdf"];
const MAX_BYTE_SIZE = 26_214_400; // 25 MB

function formatPeriod(start: string | null, end: string | null): string {
  if (!start && !end) return "—";
  const fmt = (d: string) => d.slice(0, 7); // YYYY-MM
  if (start && end) return `${fmt(start)} – ${fmt(end)}`;
  if (start) return `From ${fmt(start)}`;
  return `Until ${fmt(end!)}`;
}

function formatTier(tier: string): string {
  return tier.replace(/_/g, " ");
}

// ---------------------------------------------------------------------------
// Upload flow
// ---------------------------------------------------------------------------

function useUploadFlow(onComplete: () => void) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerPicker = () => fileInputRef.current?.click();

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!e.target.files) return;
      // Reset so the same file can be re-picked after an error.
      e.target.value = "";
      if (!file) return;

      if (!ACCEPTED_MIME_TYPES.includes(file.type) && !file.name.endsWith(".csv")) {
        setUploadError("Only CSV and PDF files are accepted in v1.");
        return;
      }
      if (file.size > MAX_BYTE_SIZE) {
        setUploadError("File exceeds 25 MB limit.");
        return;
      }

      setUploading(true);
      setUploadError(null);

      try {
        // 1. Get signed upload URL from ae-platform-api.
        const { upload_id, signed_url, method, headers: signedHeaders } = await signUpload(
          file.name,
          file.type || "text/csv",
          file.size,
        );

        // 2. PUT directly to Supabase Storage via the signed URL.
        const uploadRes = await fetch(signed_url, {
          method,
          headers: { ...signedHeaders, "Content-Type": file.type || "text/csv" },
          body: file,
        });
        if (!uploadRes.ok) {
          throw new Error(`Storage upload failed: ${uploadRes.status}`);
        }

        // 3. Trigger parse (sync; server returns immediately with credential IDs).
        await triggerParse(upload_id);

        // 4. Refresh credentials list.
        onComplete();
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : String(err));
      } finally {
        setUploading(false);
      }
    },
    [onComplete],
  );

  return { fileInputRef, triggerPicker, handleFileChange, uploading, uploadError, setUploadError };
}

// ---------------------------------------------------------------------------
// Credentials table
// ---------------------------------------------------------------------------

function CredentialsTable({ credentials }: { credentials: Credential[] }) {
  if (credentials.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No credentials yet. Upload a CSV or connect Plaid below.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <th className="px-4 py-3">Kind</th>
            <th className="px-4 py-3">Period</th>
            <th className="px-4 py-3">Verification tier</th>
            <th className="px-4 py-3">Captured at</th>
            <th className="px-4 py-3">Source</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {credentials.map((c) => (
            <tr key={c.id} className="transition-colors hover:bg-muted/20">
              <td className="px-4 py-3 font-medium">{c.kind.replace(/_/g, " ")}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatPeriod(c.period_start, c.period_end)}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-blue-600/20">
                  {formatTier(c.verification_tier)}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {new Date(c.captured_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{c.source ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AeCredentialsPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credential[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch on first render + after mutations.
  const fetchCredentials = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const rows = await listCredentials();
      setCredentials(rows);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // 401 means session expired.
      if (msg.includes("401")) {
        await supabase.auth.signOut();
        navigate("/login?next=/ae/credentials", { replace: true });
        return;
      }
      setLoadError(msg);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Trigger initial load once.
  const [initialized, setInitialized] = useState(false);
  if (!initialized) {
    setInitialized(true);
    void fetchCredentials();
  }

  // Upload flow.
  const {
    fileInputRef,
    triggerPicker,
    handleFileChange,
    uploading,
    uploadError,
    setUploadError,
  } = useUploadFlow(fetchCredentials);

  // Plaid flow.
  const {
    open: openPlaid,
    loading: plaidLoading,
    error: plaidError,
  } = useAePlaidLink({ onSuccess: fetchCredentials });

  const comingSoonProviders = [
    { label: "Connect Rippling", id: "rippling" },
    { label: "Connect CaptivateIQ", id: "captivateiq" },
    { label: "Connect Spiff", id: "spiff" },
    { label: "Connect Generic ATS", id: "generic_ats" },
  ];

  return (
    // Sentinel data attribute — verified by s6 harness.
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-8" data-marker={AE_CREDENTIALS_ROUTE_MARKER}>
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Verified credentials</h1>
        <p className="text-sm text-muted-foreground">
          Upload CSV evidence (W2, quota attainment) or connect financial accounts to produce
          verified, auditable performance records.
        </p>
      </div>

      {/* Credentials table */}
      {loadError && (
        <p className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Failed to load credentials: {loadError}
        </p>
      )}
      {loading && !credentials && (
        <p className="text-sm text-muted-foreground">Loading credentials…</p>
      )}
      {credentials !== null && <CredentialsTable credentials={credentials} />}

      {/* Actions */}
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Add credentials
        </h2>

        <div className="flex flex-wrap gap-3">
          {/* CSV upload */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              onClick={() => {
                setUploadError(null);
                triggerPicker();
              }}
              disabled={uploading}
              variant="default"
            >
              {uploading ? "Uploading…" : "Upload a CSV"}
            </Button>
          </div>

          {/* Plaid */}
          <Button
            onClick={openPlaid}
            disabled={plaidLoading}
            variant="outline"
          >
            {plaidLoading ? "Connecting…" : "Connect Plaid"}
          </Button>

          {/* Partner coming-soon buttons */}
          <TooltipProvider>
            {comingSoonProviders.map((p) => (
              <Tooltip key={p.id}>
                <TooltipTrigger
                  render={
                    <Button
                      disabled
                      variant="outline"
                      className="cursor-not-allowed opacity-50"
                      aria-disabled="true"
                    >
                      {p.label}
                    </Button>
                  }
                />
                <TooltipContent>
                  <p>Coming soon — partner approval pending</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        {/* Error banners */}
        {uploadError && (
          <p className="text-sm text-destructive">Upload error: {uploadError}</p>
        )}
        {plaidError && (
          <p className="text-sm text-destructive">Plaid error: {plaidError}</p>
        )}
      </div>
    </main>
  );
}
