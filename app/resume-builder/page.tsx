'use client';

import { useState } from 'react';
import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ResumeSelector } from '@/components/resume-selector';
import { addResumeRecord, parseResumeProfile } from '@/lib/resume';

const sampleAiResume = `Alex Rivera\nSeattle, WA\nalex.rivera@example.com\n(555) 111-2233\nhttps://linkedin.com/in/alexrivera\nhttps://github.com/alexrivera\n\nSenior Cloud Engineer\n8 years of experience\n\nSkills: AWS, Kubernetes, Terraform, CI/CD\nEducation: B.S. Computer Science\nCertifications: AWS Solutions Architect Professional`;

export default function ResumeBuilderPage() {
  const [message, setMessage] = useState('');

  const handleSaveSampleAiResume = () => {
    const parsedProfile = parseResumeProfile(sampleAiResume);
    addResumeRecord({
      id: `resume_${Date.now()}`,
      name: 'AI Generated Resume',
      source: 'ai_generated',
      fileName: 'ai-generated.txt',
      createdAt: new Date().toISOString(),
      resumeText: sampleAiResume,
      parsedProfile,
    });
    window.localStorage.setItem('applisynai_user_profile', JSON.stringify(parsedProfile));
    setMessage('Sample AI resume saved. It is now available in Resume Selector.');
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
              Save sample AI resume
            </button>
            {message && <p className="text-sm text-emerald-700">{message}</p>}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
