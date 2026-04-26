import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';

export default function ResumeBuilderPage() {
  return (
    <DashboardLayout>
      <Card title="Resume Builder" description="Create tailored, role-specific resumes faster.">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Coming soon</span>
          <p className="text-sm text-slate-600">
            Resume Builder will help you generate focused resume versions based on target roles, highlight relevant achievements,
            and keep your best bullets ready for each application.
          </p>
        </div>
      </Card>
    </DashboardLayout>
  );
}
