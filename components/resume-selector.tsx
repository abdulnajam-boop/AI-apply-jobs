'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ResumeRecord, SELECTED_RESUME_KEY, getResumes } from '@/lib/resume';

type ResumeSelectorProps = {
  title?: string;
};

export function ResumeSelector({ title = 'Resume Selector' }: ResumeSelectorProps) {
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedResumes = getResumes();
    setResumes(savedResumes);

    const savedSelectedId = window.localStorage.getItem(SELECTED_RESUME_KEY) || savedResumes[0]?.id || '';
    setSelectedResumeId(savedSelectedId);
  }, []);

  const handleUseSelectedResume = () => {
    if (!selectedResumeId) return;
    window.localStorage.setItem(SELECTED_RESUME_KEY, selectedResumeId);
    setMessage('Selected resume is now active across AI tools.');
  };

  if (resumes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-slate-50 p-5 text-sm text-slate-600">
        <p className="font-semibold text-slate-700">Upload a resume first</p>
        <Link href="/resume" className="mt-3 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          Go to Resume Upload
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-xl border border-border bg-white p-5">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <select
        value={selectedResumeId}
        onChange={(event) => setSelectedResumeId(event.target.value)}
        className="w-full rounded-lg border border-border px-3 py-2 text-sm"
      >
        {resumes.map((resume) => (
          <option key={resume.id} value={resume.id}>
            {resume.name} · {resume.source}
          </option>
        ))}
      </select>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleUseSelectedResume}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Use selected resume
        </button>
        <Link href="/resume" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-slate-700">
          Upload another resume
        </Link>
      </div>
      {message && <p className="text-xs text-emerald-700">{message}</p>}
    </div>
  );
}
