import { useState } from 'react';
import { RefreshCw, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { TinyLabel } from '@/components/layout/tiny-label';
import { PlatformSnapshot } from './components/PlatformSnapshot';
import { SectionHeading } from './components/SectionHeading';
import { ActivityCharts } from './components/ActivityCharts';
import { ImportantAlerts } from './components/ImportantAlerts';
import { useQueryClient } from '@tanstack/react-query';
import { useRecentActivity } from './hooks/useOverviewData';

export default function Overview() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { data: recentActivity, isLoading: activityLoading } = useRecentActivity();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['platform-snapshot'] });
    await queryClient.invalidateQueries({ queryKey: ['recent-activity'] });
    await queryClient.invalidateQueries({ queryKey: ['overview-charts'] });
    setIsRefreshing(false);
  };

  return (
    <div className="panel-grid min-h-full">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        
        {/* Header Section */}
        <div className="animate-rise-in mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <TinyLabel>System overview</TinyLabel>
            <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-[32px]">
              Good morning, Admin.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-[#94A3B8]">
              Live view of KinChat’s people, conversations, and platform health.
            </p>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex w-fit items-center gap-2 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-3 py-2 text-xs text-[#94A3B8] transition-colors hover:border-[#2563EB] hover:text-[#F8FAFC] disabled:opacity-50"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            Refresh data
          </button>
        </div>

        {/* Dynamic Data Row */}
        <PlatformSnapshot />

        {/* Alerts Section */}
        <div className="mt-5">
          <ImportantAlerts />
        </div>

        {/* Charts Section */}
        <div className="mt-5">
          <ActivityCharts />
        </div>

        {/* Secondary Modules */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2 xl:grid-cols-[1.35fr_1fr]">
          {/* Recent Activity */}
          <section className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5 sm:p-6">
            <SectionHeading eyebrow="Live log" title="Recent admin activity" action="View all logs" href="/admin/security" />
            <div className="mt-4 flex flex-col gap-3">
              {activityLoading ? (
                <div className="h-40 animate-pulse rounded bg-[#12243A]"></div>
              ) : recentActivity?.length ? (
                recentActivity.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 border-b border-[#1E3A5F] pb-3 last:border-0 last:pb-0">
                    <div className="mt-0.5 rounded-full bg-[#172554] p-1.5 text-[#60A5FA]">
                      <Activity size={14} />
                    </div>
                    <div>
                      <p className="text-sm text-[#E2E8F0]">
                        <span className="font-medium text-[#F8FAFC]">
                          {/* @ts-ignore */}
                          {log.users?.display_name || 'Unknown Admin'}
                        </span>{' '}
                        {log.action} <span className="text-[#94A3B8]">on {log.target_type}</span>
                      </p>
                      <p className="text-xs text-[#64748B]">
                        {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#64748B]">No recent activity found.</p>
              )}
            </div>
          </section>

          {/* System Health */}
          <section className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5 sm:p-6">
            <SectionHeading eyebrow="Infrastructure" title="System health" action="Open status" href="/admin/operations" />
            <div className="mt-4 grid gap-3">
              <div className="flex items-center justify-between rounded border border-[#1E3A5F] bg-[#0F1C2E] p-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#4ADE80]" />
                  <span className="text-sm font-medium text-[#E2E8F0]">Supabase Database</span>
                </div>
                <span className="text-xs text-[#4ADE80]">Operational</span>
              </div>
              <div className="flex items-center justify-between rounded border border-[#1E3A5F] bg-[#0F1C2E] p-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#4ADE80]" />
                  <span className="text-sm font-medium text-[#E2E8F0]">Realtime Connections</span>
                </div>
                <span className="text-xs text-[#4ADE80]">Operational</span>
              </div>
              <div className="flex items-center justify-between rounded border border-[#422006] bg-[#2A1508] p-3">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={18} className="text-[#FBBF24]" />
                  <span className="text-sm font-medium text-[#E2E8F0]">Storage API</span>
                </div>
                <span className="text-xs text-[#FBBF24]">High Latency</span>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
