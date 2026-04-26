'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ResumeSelector } from '@/components/resume-selector';
import { ACTIVE_RESUME_KEY, getResumesForCurrentUser } from '@/lib/resume';

type MatchResult = {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendation: 'Apply' | 'Maybe' | 'Skip';
  explanation: string;
  resumeImprovementTips: string[];
};

export default function MatcherPage() {
  const [activeResumeId, setActiveResumeId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<MatchResult | null>(null);

  useEffect(() => {
    setActiveResumeId(window.localStorage.getItem(ACTIVE_RESUME_KEY) || '');
  }, []);

  const handleMatch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setResult(null);

    const currentActiveResumeId = window.localStorage.getItem(ACTIVE_RESUME_KEY) || activeResumeId;
    setActiveResumeId(currentActiveResumeId);

    const resumes = getResumesForCurrentUser();
    const selectedResume = resumes.find((resume) => resume.id === currentActiveResumeId);

    if (!selectedResume) {
      setError('Please select a resume first.');
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please paste a job description first.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: selectedResume.resumeText,
          jobDescription,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload?.error || 'Unable to match resume and job description.');
        return;
      }

      setResult(payload as MatchResult);
    } catch {
      setError('Request failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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

        <Card title="Job Matcher" description="Compare selected resume with a job description using AI.">
          <form onSubmit={handleMatch} className="space-y-4">
            <textarea
              className="min-h-52 w-full rounded-lg border border-border p-3 text-sm"
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
            />
            <button type="submit" disabled={isLoading} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
              {isLoading ? 'Matching...' : 'Match Resume'}
            </button>
          </form>

          {error && <p className="mt-4 text-sm font-medium text-rose-600">{error}</p>}

          {result && (
            <div className="mt-6 space-y-4 rounded-lg border border-border bg-slate-50 p-4 text-sm">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-lg font-bold text-slate-900">Match Score: {result.matchScore}%</p>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">{result.recommendation}</span>
              </div>
              <p className="text-slate-700">{result.explanation}</p>

              <div>
                <p className="font-semibold text-slate-900">Matched Skills</p>
                <p className="text-slate-700">{result.matchedSkills.join(', ') || 'None detected'}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Missing Skills</p>
                <p className="text-slate-700">{result.missingSkills.join(', ') || 'None detected'}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Resume Improvement Tips</p>
                <ul className="list-disc pl-5 text-slate-700">
                  {result.resumeImprovementTips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
