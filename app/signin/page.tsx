'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { getStoredUsers, isAdminCredential, setAuthUser } from '@/lib/auth';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getStoredUsers();
  }, []);

  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const users = getStoredUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const localUser = users.find(
      (user) => user.provider === 'local' && user.email.toLowerCase() === normalizedEmail && user.password === password,
    );

    if (localUser || isAdminCredential(email, password)) {
      setAuthUser({
        name: localUser?.name || 'Admin User',
        email: localUser?.email || 'admin',
        provider: 'local',
      });
      router.push('/dashboard');
      return;
    }

    setError('Invalid email or password');
  };

  const handleGoogleSignIn = () => {
    setAuthUser({
      name: 'Google User',
      email: 'google-user@applisynai.mock',
      provider: 'google',
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto flex max-w-md items-center px-6 py-14">
        <section className="w-full rounded-xl border border-border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Sign in to Applisynai</h1>
          <p className="mt-2 text-sm text-slate-500">Use your account credentials to continue.</p>

          <form onSubmit={handleSignIn} className="mt-6 space-y-4">
            <input
              className="w-full rounded-lg border border-border px-3 py-2"
              type="text"
              placeholder="Email or username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="w-full rounded-lg border border-border px-3 py-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="submit"
              className="block w-full rounded-lg bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Sign In
            </button>
          </form>

          {error && <p className="mt-3 text-sm font-medium text-rose-600">{error}</p>}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="mt-4 block w-full rounded-lg border border-border px-4 py-2 text-center text-sm font-semibold text-slate-700"
          >
            Continue with Google
          </button>
          <p className="mt-2 text-xs text-slate-500">
            Google sign-in is mocked for MVP. Real OAuth will be connected before production.
          </p>

          <p className="mt-4 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-indigo-600">
              Sign up
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
