import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ResumeSelector } from '@/components/resume-selector';

export default function InterviewBuddyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ResumeSelector title="Choose resume for interview prep" />
        <Card title="Interview Buddy" description="Prepare smarter with role-specific interview coaching.">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Coming soon</span>
            <p className="text-sm text-slate-600">
              Interview Buddy will generate common and role-specific questions, suggest answer frameworks, and help you practice
              concise, high-impact responses before your interview.
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
