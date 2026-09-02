import { useTabMetrics } from '../hooks/useAnalyticsData';
import { AnalyticsCharts } from './AnalyticsCharts';

export function AnalyticsDashboard({ activeTab }: { activeTab: string }) {
  const { data, isLoading } = useTabMetrics(activeTab);

  if (isLoading) return <div className="flex h-[400px] items-center justify-center rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] text-sm text-[#64748B]">Fetching optimized metrics...</div>;

  const kpis = data?.kpis || {};
  const chartData = data?.chartData || [];

  if (activeTab === 'retention') {
    return (
      <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-6">
        <h3 className="mb-4 text-sm font-semibold text-[#F8FAFC]">Cohort Analysis (D1, D7, D30)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#1E3A5F] text-[#94A3B8]">
              <tr>
                <th className="pb-3 font-medium">Cohort Date</th>
                <th className="pb-3 font-medium">New Users</th>
                <th className="pb-3 font-medium">D1 Retention</th>
                <th className="pb-3 font-medium">D7 Retention</th>
                <th className="pb-3 font-medium">D30 Retention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E3A5F]/50 text-[#E2E8F0]">
              {chartData.map((row: any, i: number) => (
                <tr key={i}>
                  <td className="py-3">{row.date}</td>
                  <td className="py-3 font-mono-data">{row.newUsers}</td>
                  <td className="py-3 text-[#4ADE80]">{row.d1}%</td>
                  <td className="py-3 text-[#60A5FA]">{row.d7}%</td>
                  <td className="py-3 text-[#FBBF24]">{row.d30}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const chartConfigs: Record<string, any> = {
    users: { type: 'area', primaryKey: 'newUsers', secondaryKey: 'active', colors: { primary: '#3B82F6', secondary: '#10B981' } },
    messaging: { type: 'bar', primaryKey: 'messages', colors: { primary: '#8B5CF6', secondary: '' } },
    calls: { type: 'bar', primaryKey: 'success', secondaryKey: 'failed', colors: { primary: '#10B981', secondary: '#EF4444' } },
    content: { type: 'area', primaryKey: 'uploads', colors: { primary: '#06B6D4', secondary: '' } },
  };

  return (
    <div className="space-y-4">
      {Object.keys(kpis).length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Object.keys(kpis).filter(k => k.startsWith('title')).map((key, i) => {
            const valKey = `val${i + 1}`;
            return (
              <div key={key} className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4">
                <p className="text-[11px] font-mono-data uppercase tracking-wider text-[#64748B]">{kpis[key]}</p>
                <p className="mt-1 text-xl font-mono-data font-semibold text-[#F8FAFC]">{kpis[valKey]}</p>
              </div>
            );
          })}
        </div>
      )}

      {activeTab !== 'performance' && chartData.length > 0 && (
        <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5 h-[350px]">
          <AnalyticsCharts data={chartData} {...chartConfigs[activeTab]} />
        </div>
      )}
    </div>
  );
}
