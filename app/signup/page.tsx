'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Navbar } from '@/components/navbar';

type UserProfile = {
  fullName: string;
  email: string;
  phone: string;
  cityState: string;
  workAuthorization: string;
  targetJobTitles: string;
  preferredLocations: string;
  workPreference: string;
  salaryExpectation: string;
  linkedInUrl: string;
  portfolioUrl: string;
  yearsOfExperience: string;
  topSkills: string;
  education: string;
  certifications: string;
};

const initialProfile: UserProfile = {
  fullName: '',
  email: '',
  phone: '',
  cityState: '',
  workAuthorization: '',
  targetJobTitles: '',
  preferredLocations: '',
  workPreference: '',
  salaryExpectation: '',
  linkedInUrl: '',
  portfolioUrl: '',
  yearsOfExperience: '',
  topSkills: '',
  education: '',
  certifications: '',
};

export default function SignUpPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const updateField = (field: keyof UserProfile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const saveProfile = () => {
    window.localStorage.setItem('applisynai_user_profile', JSON.stringify(profile));
  };

  const handleSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveProfile();
    router.push('/resume');
  };

  const handleGoogleSignUp = () => {
    saveProfile();
    router.push('/resume');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <section className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-900">Create your job seeker profile</h1>
          <p className="mt-2 text-sm text-slate-500">UI-only onboarding for MVP. No real authentication yet.</p>
        </section>

        <form onSubmit={handleSignUp} className="space-y-5">
          <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Basics</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input className="rounded-lg border border-border px-3 py-2" placeholder="Full name" value={profile.fullName} onChange={(e) => updateField('fullName', e.target.value)} />
              <input className="rounded-lg border border-border px-3 py-2" placeholder="Email" type="email" value={profile.email} onChange={(e) => updateField('email', e.target.value)} />
              <input className="rounded-lg border border-border px-3 py-2" placeholder="Phone" value={profile.phone} onChange={(e) => updateField('phone', e.target.value)} />
              <input className="rounded-lg border border-border px-3 py-2" placeholder="City / State" value={profile.cityState} onChange={(e) => updateField('cityState', e.target.value)} />
              <input className="rounded-lg border border-border px-3 py-2" placeholder="Work authorization" value={profile.workAuthorization} onChange={(e) => updateField('workAuthorization', e.target.value)} />
              <input className="rounded-lg border border-border px-3 py-2" placeholder="Years of experience" value={profile.yearsOfExperience} onChange={(e) => updateField('yearsOfExperience', e.target.value)} />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Job preferences</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input className="rounded-lg border border-border px-3 py-2 md:col-span-2" placeholder="Target job titles (comma separated)" value={profile.targetJobTitles} onChange={(e) => updateField('targetJobTitles', e.target.value)} />
              <input className="rounded-lg border border-border px-3 py-2" placeholder="Preferred locations" value={profile.preferredLocations} onChange={(e) => updateField('preferredLocations', e.target.value)} />
              <select className="rounded-lg border border-border px-3 py-2" value={profile.workPreference} onChange={(e) => updateField('workPreference', e.target.value)}>
                <option value="">Remote / Hybrid / Onsite preference</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>
              <input className="rounded-lg border border-border px-3 py-2 md:col-span-2" placeholder="Salary expectation" value={profile.salaryExpectation} onChange={(e) => updateField('salaryExpectation', e.target.value)} />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Professional details</h2>
            <div className="mt-4 grid gap-4">
              <input className="rounded-lg border border-border px-3 py-2" placeholder="LinkedIn URL" value={profile.linkedInUrl} onChange={(e) => updateField('linkedInUrl', e.target.value)} />
              <input className="rounded-lg border border-border px-3 py-2" placeholder="Portfolio / GitHub URL" value={profile.portfolioUrl} onChange={(e) => updateField('portfolioUrl', e.target.value)} />
              <textarea className="rounded-lg border border-border px-3 py-2" rows={3} placeholder="Top skills" value={profile.topSkills} onChange={(e) => updateField('topSkills', e.target.value)} />
              <textarea className="rounded-lg border border-border px-3 py-2" rows={3} placeholder="Education" value={profile.education} onChange={(e) => updateField('education', e.target.value)} />
              <textarea className="rounded-lg border border-border px-3 py-2" rows={3} placeholder="Certifications" value={profile.certifications} onChange={(e) => updateField('certifications', e.target.value)} />
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700">
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="rounded-lg border border-border px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Continue with Google
            </button>
          </div>

          <p className="text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/signin" className="font-medium text-indigo-600">
              Sign in
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
