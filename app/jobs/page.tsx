import { DashboardLayout } from '@/components/dashboard-layout';
import { jobApplications } from '@/data/mock-data';

export default function JobsPage() {
  return (
    <DashboardLayout>
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Job Tracker</h2>
        <p className="mt-1 text-sm text-slate-500">Track applications with mock data.</p>

        <div className="mt-5 overflow-hidden rounded-lg border border-border">
          <table className="min-w-full divide-y divide-border text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-700">Company</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Role</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {jobApplications.map((job) => (
                <tr key={`${job.company}-${job.role}`}>
                  <td className="px-4 py-3 text-slate-700">{job.company}</td>
                  <td className="px-4 py-3 text-slate-900">{job.role}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{job.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
