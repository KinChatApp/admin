import { useState } from 'react';
import { ShieldAlert, Flag, Filter, ShieldCheck, Ban, Shield, Settings, Bot } from 'lucide-react';
import { TinyLabel } from '@/components/layout/tiny-label';
import { useReports, useSafetySummary } from './hooks/useSafetyData';
import { ReportDetailsDrawer } from './components/ReportDetailsDrawer';

export default function SafetyPage() {
  const [activeTab, setActiveTab] = useState<'queue' | 'automated' | 'rules' | 'blocked'>('queue');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const { data: reports, isLoading } = useReports(statusFilter, typeFilter);
  const { data: summary } = useSafetySummary();

  const tabs = [
    { id: 'queue', label: 'Moderation Queue', icon: Flag },
    { id: 'automated', label: 'Spam & Abuse (Auto)', icon: Bot },
    { id: 'rules', label: 'Safety Rules', icon: Settings },
    { id: 'blocked', label: 'Blocked Accounts', icon: Ban },
  ] as const;

  return (
    <div className="panel-grid min-h-full">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        
        {/* Header Section */}
        <div className="animate-rise-in mb-8">
          <TinyLabel>Governance</TinyLabel>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-[32px]">
            Trust & Safety Command
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[#94A3B8]">
            Enforce community guidelines, manage reports, and monitor automated abuse detection.
          </p>
        </div>

        {/* Actionable Summary Row */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-[#422006] bg-[#2A1508]/40 p-5">
            <div className="flex items-center gap-2 text-[#FBBF24] mb-2"><ShieldAlert size={16} /><span className="text-xs font-medium uppercase tracking-wider">Pending Reports</span></div>
            <p className="text-2xl font-mono-data font-semibold text-[#FBBF24]">{summary?.pendingCount || 0}</p>
          </div>
          <div className="rounded-lg border border-[#052E1A] bg-[#052E1A]/20 p-5">
            <div className="flex items-center gap-2 text-[#4ADE80] mb-2"><ShieldCheck size={16} /><span className="text-xs font-medium uppercase tracking-wider">Resolved Today</span></div>
            <p className="text-2xl font-mono-data font-semibold text-[#4ADE80]">{summary?.resolvedTodayCount || 0}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 flex overflow-x-auto border-b border-[#1E3A5F] quiet-scrollbar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive ? 'border-[#60A5FA] text-[#F8FAFC]' : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
                }`}
              >
                <Icon size={16} />
                {tab.label}
                {tab.id !== 'queue' && <span className="ml-1.5 rounded bg-[#12243A] px-1.5 py-0.5 text-[9px] text-[#60A5FA]">Future</span>}
              </button>
            );
          })}
        </div>

        {/* Active Tab Content: Moderation Queue */}
        {activeTab === 'queue' ? (
          <div className="animate-rise-in">
            {/* Filters */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-3 text-sm text-[#F8FAFC] outline-none focus:border-[#2563EB]"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Needs Review (Pending)</option>
                  <option value="resolved">Resolved</option>
                  <option value="dismissed">Dismissed</option>
                </select>
                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="h-10 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-3 text-sm text-[#F8FAFC] outline-none focus:border-[#2563EB]"
                >
                  <option value="all">All Report Types</option>
                  <option value="user">User Reports</option>
                  <option value="message">Message Reports</option>
                  <option value="chat">Chat/Group Reports</option>
                </select>
                <button className="hidden sm:flex h-10 items-center gap-2 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-3 text-sm text-[#64748B] hover:text-[#F8FAFC]">
                  <Filter size={16} />
                </button>
              </div>
            </div>

            {/* Reports Table */}
            <div className="overflow-hidden rounded-lg border border-[#1E3A5F] bg-[#0D1B2A]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-[#1E3A5F] bg-[#07111F] text-xs uppercase text-[#64748B]">
                    <tr>
                      <th className="px-5 py-4 font-mono-data font-medium">Target</th>
                      <th className="px-5 py-4 font-mono-data font-medium">Reason</th>
                      <th className="px-5 py-4 font-mono-data font-medium">Reported By</th>
                      <th className="px-5 py-4 font-mono-data font-medium">Status</th>
                      <th className="px-5 py-4 font-mono-data font-medium">Date</th>
                      <th className="px-5 py-4 font-mono-data font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E3A5F]">
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-8 text-center text-[#64748B]">Loading moderation queue...</td>
                      </tr>
                    ) : reports?.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-8 text-center text-[#64748B]">No reports found in this queue. Great job!</td>
                      </tr>
                    ) : (
                      reports?.map((report) => (
                        <tr key={report.id} className="transition-colors hover:bg-[#12243A]/50">
                          <td className="px-5 py-3">
                            <span className="inline-flex rounded bg-[#1E3A5F] px-2 py-0.5 text-[10px] font-mono-data uppercase text-[#94A3B8]">
                              {report.target_type}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <p className="font-medium text-[#F8FAFC]">{report.reason}</p>
                            {report.target_type === 'user' && (
                              <p className="text-[10px] text-[#64748B]">Against: {report.reported_user?.display_name || 'Unknown'}</p>
                            )}
                          </td>
                          <td className="px-5 py-3 text-[#E2E8F0]">
                            {report.reporter?.display_name || 'System'}
                          </td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                              report.status === 'pending' ? 'bg-[#422006] text-[#FBBF24]' : 
                              report.status === 'resolved' ? 'bg-[#052E1A] text-[#4ADE80]' : 'bg-[#1E3A5F] text-[#94A3B8]'
                            }`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-[#94A3B8]">
                            {new Date(report.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-5 py-3 text-right">
                            <button 
                              onClick={() => setSelectedReportId(report.id)}
                              className={`inline-flex h-8 items-center justify-center rounded border px-3 text-xs font-medium transition-colors ${
                                report.status === 'pending' 
                                  ? 'border-[#2563EB] bg-[#1D4ED8]/20 text-[#60A5FA] hover:bg-[#1D4ED8] hover:text-white' 
                                  : 'border-[#1E3A5F] bg-transparent text-[#64748B] hover:text-[#F8FAFC]'
                              }`}
                            >
                              {report.status === 'pending' ? 'Review' : 'View'}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-[#1E3A5F] border-dashed bg-[#0D1B2A]/50 px-4 text-center">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-[#12243A] text-[#64748B]">
              {activeTab === 'automated' && <Bot size={24} />}
              {activeTab === 'rules' && <Settings size={24} />}
              {activeTab === 'blocked' && <Ban size={24} />}
            </div>
            <h3 className="text-sm font-medium text-[#E2E8F0] capitalize">{tabs.find(t => t.id === activeTab)?.label} Module</h3>
            <p className="mt-1 max-w-sm text-xs text-[#64748B]">
              This architecture foundation is ready. Detailed interfaces for {activeTab} operations will be unlocked in a future release.
            </p>
          </div>
        )}
      </div>

      <ReportDetailsDrawer reportId={selectedReportId} onClose={() => setSelectedReportId(null)} />
    </div>
  );
}
