import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import LoginPage from "@/routes/login";
import DevLoginPage from "@/routes/dev-login";
import AeCredentialsPage from "@/routes/ae-credentials";

export default function App() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"] | null>(null);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    // PKCE callback: if ?code=... is in the URL, exchange it for a session.
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code) {
      supabase.auth.exchangeCodeForSession(window.location.search).then(({ error }) => {
        if (error) console.error("PKCE exchange failed:", error);
        // Strip ?code= from the URL after exchange.
        url.searchParams.delete("code");
        navigate(url.pathname + (url.search ? `?${url.searchParams.toString()}` : "") + url.hash, { replace: true });
      });
    }

    // Subscribe to auth state.
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setBootstrapped(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => setSession(sess));
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  if (!bootstrapped) return null;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={session ? "/ae" : "/login"} replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dev-login" element={<DevLoginPage />} />
      {/* /ae is the post-sign-in candidate home — stub for this cycle */}
      <Route
        path="/ae"
        element={
          <div className="p-8 space-y-4">
            <p>Signed in. (AE home stub.)</p>
            <nav>
              <Link to="/ae/credentials" className="text-sm text-blue-600 underline">
                Verified Credentials
              </Link>
            </nav>
          </div>
        }
      />
      <Route path="/ae/credentials" element={<AeCredentialsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
