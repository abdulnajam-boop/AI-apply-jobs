import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ResumeSelector } from '@/components/resume-selector';

export default function MatcherPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ResumeSelector title="Choose resume for matching" />
        <Card title="Job Matcher" description="Paste a role description to see a mock fit score.">
          <form className="space-y-4">
            <textarea
              className="min-h-52 w-full rounded-lg border border-border p-3 text-sm"
              placeholder="Paste job description here..."
            />
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Match Resume</button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
