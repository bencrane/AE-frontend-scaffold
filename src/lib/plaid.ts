/**
 * plaid.ts — wrapper around react-plaid-link's usePlaidLink hook.
 * Fetches a link token from ae-platform-api, then exposes the Plaid `open` fn.
 *
 * Usage:
 *   const { open, ready, error } = useAePlaidLink({ onSuccess });
 *   <button onClick={() => open()} disabled={!ready}>Connect Plaid</button>
 */
import { useCallback, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { createPlaidLinkToken, exchangePlaidPublicToken } from "@/lib/credentials-api";

export interface UseAePlaidLinkOptions {
  onSuccess: () => void;
}

export interface UseAePlaidLinkResult {
  open: () => void;
  ready: boolean;
  loading: boolean;
  error: string | null;
}

export function useAePlaidLink({ onSuccess }: UseAePlaidLinkOptions): UseAePlaidLinkResult {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  const fetchLinkToken = useCallback(async () => {
    if (linkToken || fetching) return;
    setFetching(true);
    setFetchError(null);
    try {
      const { link_token } = await createPlaidLinkToken();
      setLinkToken(link_token);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // If backend 503 (Plaid not yet configured), surface a friendly message.
      const friendly = msg.includes("503")
        ? "Plaid not yet configured — operator action pending."
        : msg;
      setFetchError(friendly);
    } finally {
      setFetching(false);
    }
  }, [linkToken, fetching]);

  const { open: plaidOpen, ready } = usePlaidLink({
    token: linkToken ?? "",
    onSuccess: async (publicToken) => {
      try {
        await exchangePlaidPublicToken(publicToken);
        onSuccess();
      } catch (err) {
        console.error("Plaid exchange failed:", err);
      }
    },
  });

  const open = useCallback((): void => {
    if (!linkToken) {
      void fetchLinkToken();
      return;
    }
    plaidOpen();
  }, [linkToken, fetchLinkToken, plaidOpen]);

  return {
    open,
    ready: ready && !!linkToken,
    loading: fetching,
    error: fetchError,
  };
}
