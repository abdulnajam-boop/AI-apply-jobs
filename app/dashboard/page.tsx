import { Card } from '@/components/card';
import { DashboardLayout } from '@/components/dashboard-layout';
import { dashboardStats, jobApplications } from '@/data/mock-data';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <p className="text-sm text-slate-500">Overview of your job search pipeline.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {dashboardStats.map((stat) => (
            <Card key={stat.title} title={stat.title}>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-500">{stat.description}</p>
            </Card>
          ))}
        </div>

        <Card title="Recent Applications" description="Latest jobs from your tracker.">
          <ul className="space-y-3 text-sm">
            {jobApplications.slice(0, 3).map((job) => (
              <li key={`${job.company}-${job.role}`} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                <div>
                  <p className="font-medium text-slate-900">{job.role}</p>
                  <p className="text-slate-500">{job.company}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{job.status}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
