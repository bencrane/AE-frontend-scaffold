'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Sign-in page. Supports two flows on one form:
//   1. Email + password  → supabase.auth.signInWithPassword
//   2. Email only        → supabase.auth.signInWithOtp (magic link)
//
// `?kind=candidate` or `?kind=company_member` controls the kind stamped on
// the profile row when a new user signs up via magic link (the handle_new_user
// trigger reads raw_user_meta_data.kind).

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kind = searchParams.get('kind') ?? 'candidate';
  const next = searchParams.get('next') ?? '/ae';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'signing-in' | 'sending-link' | 'link-sent' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handlePasswordSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('signing-in');
    setErrorMessage(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus('error');
      setErrorMessage(error.message);
      return;
    }
    router.replace(next);
    router.refresh();
  }

  async function handleMagicLink() {
    if (!email) {
      setStatus('error');
      setErrorMessage('Enter your email first.');
      return;
    }
    setStatus('sending-link');
    setErrorMessage(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        data: { kind },
      },
    });
    if (error) {
      setStatus('error');
      setErrorMessage(error.message);
      return;
    }
    setStatus('link-sent');
  }

  if (status === 'link-sent') {
    return (
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="font-serif text-2xl">Check your email</h1>
        <div className="rounded-md border p-4 text-sm">
          We sent a sign-in link to <span className="font-medium">{email}</span>.
        </div>
      </div>
    );
  }

  const isSubmitting = status === 'signing-in' || status === 'sending-link';

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="font-serif text-2xl">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Email + password, or we’ll email you a link.
        </p>
      </div>

      <form onSubmit={handlePasswordSignIn} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Required for password sign-in"
          />
        </div>
        <Button type="submit" disabled={isSubmitting || !password} className="w-full">
          {status === 'signing-in' ? 'Signing in…' : 'Sign in'}
        </Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting || !email}
          onClick={handleMagicLink}
          className="w-full"
        >
          {status === 'sending-link' ? 'Sending link…' : 'Email me a sign-in link'}
        </Button>

        {status === 'error' && errorMessage && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
