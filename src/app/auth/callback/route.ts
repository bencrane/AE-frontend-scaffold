import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Handles the redirect after a Supabase magic-link or OAuth flow. The code
// param is exchanged for a session cookie via the server-side client.
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/ae';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const redirect = new URL(next, url.origin);
      return NextResponse.redirect(redirect);
    }
  }

  // Failure path — send to login with a generic error indicator.
  const fail = new URL('/login', url.origin);
  fail.searchParams.set('error', 'auth_callback_failed');
  return NextResponse.redirect(fail);
}
