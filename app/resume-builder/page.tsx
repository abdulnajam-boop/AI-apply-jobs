'use client';

import { useState } from 'react';
import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ResumeSelector } from '@/components/resume-selector';
import { getAuthUser } from '@/lib/auth';
import { ACTIVE_RESUME_KEY, ResumeRecord, parseResumeProfile, upsertResume } from '@/lib/resume';

const sampleAiResume = `Alex Rivera\nSeattle, WA\nalex.rivera@example.com\n(555) 111-2233\nhttps://linkedin.com/in/alexrivera\nhttps://github.com/alexrivera\n\nSenior Cloud Engineer\n\nSkills: AWS, Kubernetes, Terraform, CI/CD\nEducation: B.S. Computer Science\nCertifications: AWS Solutions Architect Professional`;

export default function ResumeBuilderPage() {
  const [message, setMessage] = useState('');

  const handleSaveSampleAiResume = () => {
    const authUser = getAuthUser();
    if (!authUser) return;

    const now = new Date().toISOString();
    const parsedProfile = parseResumeProfile(sampleAiResume);
    const aiResume: ResumeRecord = {
      id: `resume_${Date.now()}`,
      ownerId: authUser.id,
      name: 'AI Resume',
      source: 'ai_generated',
      fileName: 'ai-generated.txt',
      fileType: 'text/plain',
      fileSize: sampleAiResume.length,
      createdAt: now,
      updatedAt: now,
      resumeText: sampleAiResume,
      parsedProfile,
    };

    upsertResume(aiResume);
    window.localStorage.setItem(ACTIVE_RESUME_KEY, aiResume.id);
    setMessage('Sample AI-generated resume saved to your library.');
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ResumeSelector title="Choose resume for builder" />
        <Card title="Resume Builder" description="Create tailored, role-specific resumes faster.">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Coming soon</span>
            <p className="text-sm text-slate-600">
              Resume Builder will help you generate focused resume versions based on target roles, highlight relevant achievements,
              and keep your best bullets ready for each application.
            </p>
            <button
              type="button"
              onClick={handleSaveSampleAiResume}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Save sample AI-generated resume
            </button>
            {message && <p className="text-sm text-emerald-700">{message}</p>}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
