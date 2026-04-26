'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ResumeSelector } from '@/components/resume-selector';
import { ACTIVE_RESUME_KEY } from '@/lib/resume';

export default function MatcherPage() {
  const [activeResumeId, setActiveResumeId] = useState('');

  useEffect(() => {
    setActiveResumeId(window.localStorage.getItem(ACTIVE_RESUME_KEY) || '');
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ResumeSelector title="Choose resume for matching" />

        {!activeResumeId && (
          <div className="rounded-xl border border-dashed border-border bg-slate-50 p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-700">Upload a resume first</p>
            <Link href="/resume" className="mt-3 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              Go to Resume Upload
            </Link>
          </div>
        )}

        <Card title="Job Matcher" description="Paste a role description to see a mock fit score.">
          <form className="space-y-4">
            <textarea
              className="min-h-52 w-full rounded-lg border border-border p-3 text-sm"
              placeholder="Paste job description here..."
            />
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Match Resume</button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
