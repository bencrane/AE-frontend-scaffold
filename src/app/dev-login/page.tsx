'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Dev password sign-in. Lets the operator switch between seeded identities
// quickly without round-tripping through a magic-link email. Production sign-in
// remains /login (magic link). The seeded dev users live in
// scripts/seed-dev-users.mjs.
export default function DevLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/ae';
  const [email, setEmail] = useState('candidate1@accountexecutive.test');
  const [password, setPassword] = useState('dev-password-123');
  const [status, setStatus] = useState<'idle' | 'signing-in' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

  function quickFill(role: 'candidate' | 'company_member') {
    setEmail(
      role === 'candidate'
        ? 'candidate1@accountexecutive.test'
        : 'recruiter1@accountexecutive.test',
    );
    setPassword('dev-password-123');
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="font-serif text-2xl">Dev sign-in</h1>
          <p className="text-sm text-muted-foreground">
            Password sign-in for seeded identities. Use /login for magic-link.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => quickFill('candidate')}
          >
            Candidate
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => quickFill('company_member')}
          >
            Recruiter @ Stripe
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={status === 'signing-in'} className="w-full">
            {status === 'signing-in' ? 'Signing in…' : 'Sign in'}
          </Button>
          {status === 'error' && errorMessage && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}
        </form>
      </div>
    </main>
  );
}
