import { useState } from 'react';
import { Users, MessageSquare, PhoneCall, Database, Clock, Activity, DownloadCloud } from 'lucide-react';
import { TinyLabel } from '@/components/layout/tiny-label';
import { useGlobalMetrics } from './hooks/useAnalyticsData';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('users');
  const { data: global } = useGlobalMetrics();

  const tabs = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'messaging', label: 'Messaging', icon: MessageSquare },
    { id: 'calls', label: 'Calls', icon: PhoneCall },
    { id: 'content', label: 'Content', icon: Database },
    { id: 'retention', label: 'Retention', icon: Clock },
    { id: 'performance', label: 'Performance', icon: Activity },
  ];

  return (
    <div className="panel-grid min-h-full">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">

        {/* Header */}
        <div className="animate-rise-in mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <TinyLabel>Intelligence</TinyLabel>
            <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-[32px]">
              Platform Analytics
            </h1>
            <p className="mt-2 max-w-xl text-sm text-[#94A3B8]">
              Comprehensive telemetry covering user growth, messaging volume, call intelligence, and system performance.
            </p>
          </div>
          <button className="flex w-fit items-center gap-2 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-3 py-2 text-xs text-[#94A3B8] transition-colors hover:border-[#2563EB] hover:text-[#F8FAFC]">
            <DownloadCloud size={14} /> Export CSV
          </button>
        </div>

        {/* Global Overview KPIs */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
          <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4">
            <p className="text-[11px] font-mono-data uppercase text-[#64748B]">Total Users</p>
            <p className="mt-1 text-2xl font-mono-data font-semibold text-[#F8FAFC]">{global?.totalUsers.toLocaleString() || 0}</p>
          </div>
          <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4">
            <p className="text-[11px] font-mono-data uppercase text-[#60A5FA]">DAU</p>
            <p className="mt-1 text-2xl font-mono-data font-semibold text-[#60A5FA]">{global?.dau.toLocaleString() || 0}</p>
          </div>
          <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4">
            <p className="text-[11px] font-mono-data uppercase text-[#34D399]">WAU / MAU</p>
            <p className="mt-1 text-lg font-mono-data font-semibold text-[#34D399]">{global?.wau || 0} <span className="text-[#64748B]">/</span> {global?.mau || 0}</p>
          </div>
          <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4">
            <p className="text-[11px] font-mono-data uppercase text-[#A78BFA]">Messages Today</p>
            <p className="mt-1 text-2xl font-mono-data font-semibold text-[#A78BFA]">{global?.msgsToday.toLocaleString() || 0}</p>
          </div>
          <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4">
            <p className="text-[11px] font-mono-data uppercase text-[#FBBF24]">Calls Today</p>
            <p className="mt-1 text-2xl font-mono-data font-semibold text-[#FBBF24]">{global?.callsToday.toLocaleString() || 0}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 flex overflow-x-auto border-b border-[#1E3A5F] quiet-scrollbar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'border-[#60A5FA] text-[#F8FAFC]' : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Section */}
        <div className="animate-rise-in min-h-[400px]">
          <AnalyticsDashboard activeTab={activeTab} />
        </div>

      </div>
    </div>
  );
}
