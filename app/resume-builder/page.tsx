'use client';

import { useState } from 'react';
import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ResumeSelector } from '@/components/resume-selector';
import { ResumeRecord, getCurrentOwnerId, parseResumeProfile, upsertResume } from '@/lib/resume';

export default function ResumeBuilderPage() {
  const [targetRole, setTargetRole] = useState('');
  const [draft, setDraft] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerateDraft = () => {
    setDraft(`Improved Resume Draft\n\nTarget Role: ${targetRole || 'Software Engineer'}\n\nSummary:\nResults-driven professional with strong ownership and collaboration skills.\n\nKey Skills:\n- System design\n- Communication\n- Problem solving\n\nExperience Highlights:\n- Led high-impact projects across teams\n- Improved reliability and delivery timelines`);
  };

  const handleSaveAiResume = () => {
    if (!draft.trim()) return;

    const now = new Date().toISOString();
    const aiResume: ResumeRecord = {
      id: `resume_${Date.now()}`,
      ownerId: getCurrentOwnerId(),
      name: 'AI Resume',
      source: 'ai_generated',
      fileName: 'ai-generated.txt',
      fileType: 'text/plain',
      fileSize: draft.length,
      createdAt: now,
      updatedAt: now,
      resumeText: draft,
      parsedProfile: parseResumeProfile(draft),
    };

    upsertResume(aiResume);
    setMessage('AI-generated resume saved to your library.');
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ResumeSelector title="Select resume for builder" />
        <Card title="Resume Builder" description="Generate a mock improved resume draft.">
          <div className="space-y-3">
            <input
              value={targetRole}
              onChange={(event) => setTargetRole(event.target.value)}
              placeholder="Target role"
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
            <button type="button" onClick={handleGenerateDraft} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              Generate Improved Resume Draft
            </button>

            {draft && (
              <>
                <textarea value={draft} readOnly rows={12} className="w-full rounded-lg border border-border bg-slate-50 px-3 py-2 text-sm" />
                <button type="button" onClick={handleSaveAiResume} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-slate-700">
                  Save as AI Generated Resume
                </button>
              </>
            )}

            {message && <p className="text-sm text-emerald-700">{message}</p>}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
