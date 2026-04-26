'use client';

import { useState } from 'react';
import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ResumeSelector } from '@/components/resume-selector';

export default function InterviewBuddyPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);

  const handleGenerateQuestions = () => {
    setQuestions([
      'Tell me about a project where you solved a difficult problem.',
      'How do you prioritize tasks when deadlines conflict?',
      `What experience do you have related to: ${jobDescription.slice(0, 70) || 'this role'}?`,
      'Describe a time you collaborated cross-functionally.',
      'What would your first 30 days in this role look like?',
    ]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ResumeSelector title="Select resume for interview prep" />
        <Card title="Interview Buddy" description="Generate mock interview questions from the selected resume and role.">
          <div className="space-y-3">
            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              rows={6}
              placeholder="Paste job description..."
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
            <button type="button" onClick={handleGenerateQuestions} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              Generate Interview Questions
            </button>

            {questions.length > 0 && (
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
