'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ResumeSelector } from '@/components/resume-selector';
import { RESUME_LIBRARY_EVENT, getActiveResumeId, getResumesForCurrentUser } from '@/lib/resume';

type MatchResult = {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendation: 'Apply' | 'Maybe' | 'Skip';
};

export default function MatcherPage() {
  const [activeResumeName, setActiveResumeName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<MatchResult | null>(null);

  const syncActiveResume = () => {
    const activeId = getActiveResumeId();
    const resume = getResumesForCurrentUser().find((item) => item.id === activeId);
    setActiveResumeName(resume?.name || '');
  };

  useEffect(() => {
    syncActiveResume();
    window.addEventListener(RESUME_LIBRARY_EVENT, syncActiveResume);
    window.addEventListener('storage', syncActiveResume);

    return () => {
      window.removeEventListener(RESUME_LIBRARY_EVENT, syncActiveResume);
      window.removeEventListener('storage', syncActiveResume);
    };
  }, []);

  const handleMatch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    syncActiveResume();

    const score = Math.min(95, Math.max(45, Math.floor(jobDescription.length / 15)));
    setResult({
      score,
      matchedSkills: ['Communication', 'Problem Solving', 'Collaboration'],
      missingSkills: ['Domain-specific tooling', 'Direct industry experience'],
      recommendation: score > 75 ? 'Apply' : score > 60 ? 'Maybe' : 'Skip',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ResumeSelector title="Select resume for matcher" />

        <Card title="Job Matcher" description="Compare your selected resume with a target role.">
          {activeResumeName ? (
            <p className="mb-3 text-sm text-slate-600">Using resume: <span className="font-semibold text-slate-900">{activeResumeName}</span></p>
          ) : (
            <p className="mb-3 text-sm text-amber-700">No active resume selected yet.</p>
          )}

          <form onSubmit={handleMatch} className="space-y-4">
            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              className="min-h-52 w-full rounded-lg border border-border p-3 text-sm"
              placeholder="Paste job description here..."
            />
            <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              Match Resume
            </button>
          </form>

          {result && (
            <div className="mt-5 space-y-2 rounded-lg border border-border bg-slate-50 p-4 text-sm">
              <p className="font-bold text-slate-900">Score: {result.score}%</p>
              <p><span className="font-semibold">Recommendation:</span> {result.recommendation}</p>
              <p><span className="font-semibold">Matched skills:</span> {result.matchedSkills.join(', ')}</p>
              <p><span className="font-semibold">Missing skills:</span> {result.missingSkills.join(', ')}</p>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
