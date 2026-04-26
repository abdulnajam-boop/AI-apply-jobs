import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ResumeSelector } from '@/components/resume-selector';

export default function CoverLetterBuilderPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ResumeSelector title="Choose resume for cover letter" />
        <Card title="Cover Letter Builder" description="Draft strong, personalized cover letters with less effort.">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Coming soon</span>
            <p className="text-sm text-slate-600">
              Cover Letter Builder will turn your resume and a job description into a polished first draft that you can review,
              edit, and approve before sending.
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
