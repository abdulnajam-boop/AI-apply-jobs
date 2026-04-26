'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { getStoredUsers, saveStoredUsers, setAuthUser } from '@/lib/auth';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getStoredUsers();
  }, []);

  const handleSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();

    if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
      setError('Account already exists. Please sign in.');
      return;
    }

    const newUser = {
      name: name.trim() || 'New User',
      email: normalizedEmail,
      password,
      provider: 'local' as const,
    };

    saveStoredUsers([...users, newUser]);
    setAuthUser({ name: newUser.name, email: newUser.email, provider: 'local' });
    router.push('/resume');
  };

  const handleGoogleSignUp = () => {
    const users = getStoredUsers();
    const googleUserEmail = 'google-user@applisynai.mock';
    const existingGoogleUser = users.find((user) => user.email === googleUserEmail);

    if (!existingGoogleUser) {
      saveStoredUsers([
        ...users,
        {
          name: 'Google User',
          email: googleUserEmail,
          provider: 'google',
        },
      ]);
    }

    setAuthUser({ name: 'Google User', email: googleUserEmail, provider: 'google' });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto flex max-w-md items-center px-6 py-14">
        <section className="w-full rounded-xl border border-border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500">Set up your Applisynai login in seconds.</p>

          <form onSubmit={handleSignUp} className="mt-6 space-y-4">
            <input
              className="w-full rounded-lg border border-border px-3 py-2"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              className="w-full rounded-lg border border-border px-3 py-2"
              type="email"
              placeholder="Email"
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
            <button type="submit" className="w-full rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700">
              Sign Up
            </button>
          </form>

          {error && <p className="mt-3 text-sm font-medium text-rose-600">{error}</p>}

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="mt-4 w-full rounded-lg border border-border px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Continue with Google
          </button>
          <p className="mt-2 text-xs text-slate-500">
            Google sign-in is mocked for MVP. Real OAuth will be connected before production.
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/signin" className="font-medium text-indigo-600">
              Sign in
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
