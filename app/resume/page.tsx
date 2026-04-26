import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';

export default function ResumePage() {
  return (
    <DashboardLayout>
      <Card title="Resume Upload" description="Use mock upload for MVP flow.">
        <div className="rounded-lg border border-dashed border-border bg-slate-50 p-8 text-center">
          <p className="text-sm text-slate-600">Drag and drop your resume file here (mock only).</p>
          <button className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Select File</button>
        </div>
      </Card>
    </DashboardLayout>
  );
}
