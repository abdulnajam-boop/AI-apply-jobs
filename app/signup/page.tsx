'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { getStoredUsers, saveStoredUsers, setAuthUser } from '@/lib/auth';

type UserProfile = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl: string;
  portfolioUrl: string;
  skills: string;
  education: string;
  certifications: string;
  yearsOfExperience: string;
  recentJobTitles: string;
};

const emptyProfile: UserProfile = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedInUrl: '',
  portfolioUrl: '',
  skills: '',
  education: '',
  certifications: '',
  yearsOfExperience: '',
  recentJobTitles: '',
};

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [showPrefillNotice, setShowPrefillNotice] = useState(false);

  useEffect(() => {
    getStoredUsers();

    const storedProfile = window.localStorage.getItem('applisynai_user_profile');
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile) as UserProfile;
        setProfile({ ...emptyProfile, ...parsed });
        setName(parsed.fullName || '');
        setEmail(parsed.email || '');
        setShowPrefillNotice(true);
      } catch {
        setShowPrefillNotice(false);
      }
    }
  }, []);

  const updateProfileField = (field: keyof UserProfile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

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
      name: name.trim() || profile.fullName || 'New User',
      email: normalizedEmail,
      password,
      provider: 'local' as const,
    };

    saveStoredUsers([...users, newUser]);
    const mergedProfile = {
      ...profile,
      fullName: newUser.name,
      email: normalizedEmail,
    };
    window.localStorage.setItem('applisynai_user_profile', JSON.stringify(mergedProfile));
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
      <main className="mx-auto max-w-3xl px-6 py-14">
        <section className="w-full rounded-xl border border-border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500">Set up your Applisynai login in seconds.</p>
          {showPrefillNotice && (
            <p className="mt-3 rounded-lg bg-indigo-50 px-3 py-2 text-xs text-indigo-700">
              We prefilled this from your resume. You can edit anything before continuing.
            </p>
          )}

          <form onSubmit={handleSignUp} className="mt-6 space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className="rounded-lg border border-border px-3 py-2"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  updateProfileField('fullName', event.target.value);
                }}
              />
              <input
                className="rounded-lg border border-border px-3 py-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  updateProfileField('email', event.target.value);
                }}
              />
              <input
                className="rounded-lg border border-border px-3 py-2"
                placeholder="Phone"
                value={profile.phone}
                onChange={(event) => updateProfileField('phone', event.target.value)}
              />
              <input
                className="rounded-lg border border-border px-3 py-2"
                placeholder="Location"
                value={profile.location}
                onChange={(event) => updateProfileField('location', event.target.value)}
              />
              <input
                className="rounded-lg border border-border px-3 py-2"
                placeholder="LinkedIn URL"
                value={profile.linkedInUrl}
                onChange={(event) => updateProfileField('linkedInUrl', event.target.value)}
              />
              <input
                className="rounded-lg border border-border px-3 py-2"
                placeholder="GitHub / Portfolio URL"
                value={profile.portfolioUrl}
                onChange={(event) => updateProfileField('portfolioUrl', event.target.value)}
              />
              <input
                className="rounded-lg border border-border px-3 py-2"
                placeholder="Years of experience"
                value={profile.yearsOfExperience}
                onChange={(event) => updateProfileField('yearsOfExperience', event.target.value)}
              />
              <input
                className="rounded-lg border border-border px-3 py-2"
                placeholder="Recent job titles"
                value={profile.recentJobTitles}
                onChange={(event) => updateProfileField('recentJobTitles', event.target.value)}
              />
            </div>

            <textarea
              className="w-full rounded-lg border border-border px-3 py-2"
              rows={2}
              placeholder="Top skills"
              value={profile.skills}
              onChange={(event) => updateProfileField('skills', event.target.value)}
            />
            <textarea
              className="w-full rounded-lg border border-border px-3 py-2"
              rows={2}
              placeholder="Education"
              value={profile.education}
              onChange={(event) => updateProfileField('education', event.target.value)}
            />
            <textarea
              className="w-full rounded-lg border border-border px-3 py-2"
              rows={2}
              placeholder="Certifications"
              value={profile.certifications}
              onChange={(event) => updateProfileField('certifications', event.target.value)}
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
