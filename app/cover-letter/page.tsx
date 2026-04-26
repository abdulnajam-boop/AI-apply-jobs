'use client';

import { useState } from 'react';
import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ResumeSelector } from '@/components/resume-selector';
import { getActiveResumeId, getResumesForCurrentUser } from '@/lib/resume';

export default function CoverLetterBuilderPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const handleGenerate = () => {
    const activeResumeId = getActiveResumeId();
    const activeResume = getResumesForCurrentUser().find((resume) => resume.id === activeResumeId);
    const resumeName = activeResume?.name || 'Selected Resume';

    setCoverLetter(
      `Dear Hiring Team,\n\nI am excited to apply for this role. Based on my ${resumeName}, I bring relevant experience and a strong ability to deliver impact quickly.\n\nHighlights from your job description that align well with my background:\n- ${jobDescription.slice(0, 90) || 'Role responsibilities and collaboration'}\n\nI would welcome the opportunity to discuss how I can contribute to your team.\n\nSincerely,\nCandidate`,
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ResumeSelector title="Select resume for cover letter" />
        <Card title="Cover Letter Builder" description="Generate a draft cover letter using your selected resume.">
          <div className="space-y-3">
            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              rows={6}
              placeholder="Paste job description..."
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
            <button type="button" onClick={handleGenerate} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              Generate Cover Letter
            </button>

            {coverLetter && (
              <div className="space-y-2">
                <textarea value={coverLetter} readOnly rows={12} className="w-full rounded-lg border border-border bg-slate-50 px-3 py-2 text-sm" />
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(coverLetter)}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Copy
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
