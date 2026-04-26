import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';

export default function CoverLetterBuilderPage() {
  return (
    <DashboardLayout>
      <Card title="Cover Letter Builder" description="Draft strong, personalized cover letters with less effort.">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Coming soon</span>
          <p className="text-sm text-slate-600">
            Cover Letter Builder will turn your resume and a job description into a polished first draft that you can review,
            edit, and approve before sending.
          </p>
        </div>
      </Card>
    </DashboardLayout>
  );
}
