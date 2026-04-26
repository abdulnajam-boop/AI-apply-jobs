'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ResumeRecord, getActiveResumeId, getResumesForCurrentUser, setActiveResumeId } from '@/lib/resume';

type ResumeSelectorProps = {
  title?: string;
};

export function ResumeSelector({ title = 'Resume Selector' }: ResumeSelectorProps) {
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userResumes = getResumesForCurrentUser();
    setResumes(userResumes);

    const activeId = getActiveResumeId() || userResumes[0]?.id || '';
    setSelectedResumeId(activeId);
  }, []);

  const selectedResume = resumes.find((resume) => resume.id === selectedResumeId);

  const handleUseSelectedResume = () => {
    if (!selectedResumeId) return;
    setActiveResumeId(selectedResumeId);
    setMessage('Active resume updated.');
  };

  return (
    <div className="space-y-3 rounded-xl border border-border bg-white p-5">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>

      {resumes.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-700">No saved resumes yet</p>
          <Link href="/resume" className="mt-3 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Upload Resume
          </Link>
        </div>
      ) : (
        <>
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

          {selectedResume && <p className="text-xs text-slate-500">Selected resume: {selectedResume.name}</p>}
        </>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleUseSelectedResume}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          disabled={resumes.length === 0}
        >
          Use selected resume
        </button>
        <Link href="/resume" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-slate-700">
          Upload new resume
        </Link>
      </div>

      {message && <p className="text-xs text-emerald-700">{message}</p>}
    </div>
  );
}
