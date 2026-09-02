import { useState } from 'react';
import { BellRing, Megaphone, Target, LayoutTemplate, Search, Filter, Send, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { TinyLabel } from '@/components/layout/tiny-label';
import { useNotificationLogs, useEngagementStats } from './hooks/useEngagementData';
import { NotificationDetailsDrawer } from './components/NotificationDetailsDrawer';

export default function EngagementPage() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'announcements' | 'campaigns' | 'templates'>('notifications');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  const { data: logs, isLoading } = useNotificationLogs(statusFilter, searchQuery);
  const { data: stats } = useEngagementStats();

  const tabs = [
    { id: 'notifications', label: 'Push Notifications', icon: BellRing },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  ] as const;

  return (
    <div className="panel-grid min-h-full">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        
        {/* Header Section */}
        <div className="animate-rise-in mb-8">
          <TinyLabel>User Interaction</TinyLabel>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-[32px]">
            Platform Engagement
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[#94A3B8]">
            Manage platform-level communication, push notifications, and future marketing campaigns.
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-[#052E1A] bg-[#052E1A]/20 p-5">
            <div className="flex items-center gap-2 text-[#4ADE80] mb-2"><Send size={16} /><span className="text-xs font-medium uppercase tracking-wider">Delivered Today</span></div>
            <p className="text-2xl font-mono-data font-semibold text-[#4ADE80]">{stats?.sent || 0}</p>
          </div>
          <div className="rounded-lg border border-[#450A0A] bg-[#450A0A]/20 p-5">
            <div className="flex items-center gap-2 text-[#F87171] mb-2"><AlertOctagon size={16} /><span className="text-xs font-medium uppercase tracking-wider">Failed Deliveries</span></div>
            <p className="text-2xl font-mono-data font-semibold text-[#F87171]">{stats?.failed || 0}</p>
          </div>
          <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5">
            <div className="flex items-center gap-2 text-[#60A5FA] mb-2"><CheckCircle2 size={16} /><span className="text-xs font-medium uppercase tracking-wider">Delivery Rate</span></div>
            <p className="text-2xl font-mono-data font-semibold text-[#60A5FA]">{stats?.successRate || 0}%</p>
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
                {tab.id !== 'notifications' && <span className="ml-1.5 rounded bg-[#12243A] px-1.5 py-0.5 text-[9px] text-[#60A5FA]">Future</span>}
              </button>
            );
          })}
        </div>

        {/* Active Tab Content: Notifications */}
        {activeTab === 'notifications' ? (
          <div className="animate-rise-in">
            {/* Filters */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                <input 
                  type="text" 
                  placeholder="Search notification titles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-md border border-[#1E3A5F] bg-[#0D1B2A] pl-9 pr-4 text-sm text-[#F8FAFC] outline-none transition-colors focus:border-[#2563EB]"
                />
              </div>
              <div className="flex gap-2">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-3 text-sm text-[#F8FAFC] outline-none focus:border-[#2563EB]"
                >
                  <option value="all">All Deliveries</option>
                  <option value="sent">Successfully Sent</option>
                  <option value="failed">Failed Deliveries</option>
                  <option value="pending">Pending Queue</option>
                </select>
                <button className="hidden sm:flex h-10 items-center gap-2 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-3 text-sm text-[#64748B] hover:text-[#F8FAFC]">
                  <Filter size={16} />
                </button>
              </div>
            </div>

            {/* Notifications Table */}
            <div className="overflow-hidden rounded-lg border border-[#1E3A5F] bg-[#0D1B2A]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-[#1E3A5F] bg-[#07111F] text-xs uppercase text-[#64748B]">
                    <tr>
                      <th className="px-5 py-4 font-mono-data font-medium">Notification Content</th>
                      <th className="px-5 py-4 font-mono-data font-medium">Recipient</th>
                      <th className="px-5 py-4 font-mono-data font-medium">Status</th>
                      <th className="px-5 py-4 font-mono-data font-medium">Time</th>
                      <th className="px-5 py-4 font-mono-data font-medium text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E3A5F]">
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-8 text-center text-[#64748B]">Loading dispatch logs...</td>
                      </tr>
                    ) : logs?.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-8 text-center text-[#64748B]">No push notifications found.</td>
                      </tr>
                    ) : (
                      logs?.map((log) => (
                        <tr key={log.id} className="transition-colors hover:bg-[#12243A]/50">
                          <td className="px-5 py-3">
                            <p className="font-medium text-[#F8FAFC] truncate max-w-[250px]">{log.title || 'Untitled'}</p>
                            <p className="text-[11px] text-[#64748B] truncate max-w-[250px] mt-0.5">{log.body}</p>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              {log.user ? (
                                <>
                                  <div className="grid h-6 w-6 place-items-center rounded-full bg-[#1D4ED8] text-[9px] font-bold text-white">
                                    {log.user.display_name?.charAt(0).toUpperCase()}
                                  </div>
                                  <span className="text-[#E2E8F0]">{log.user.display_name}</span>
                                </>
                              ) : (
                                <span className="rounded bg-[#1E3A5F] px-2 py-0.5 text-[10px] uppercase text-[#94A3B8]">Broadcast</span>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                              log.status === 'sent' ? 'bg-[#052E1A] text-[#4ADE80]' : 
                              log.status === 'failed' ? 'bg-[#450A0A] text-[#F87171]' : 'bg-[#422006] text-[#FBBF24]'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-[#94A3B8]">
                            {new Date(log.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                          </td>
                          <td className="px-5 py-3 text-right">
                            <button 
                              onClick={() => setSelectedLogId(log.id)}
                              className="inline-flex h-8 items-center justify-center rounded border border-[#1E3A5F] bg-transparent px-3 text-xs text-[#60A5FA] hover:bg-[#1E3A5F] hover:text-[#F8FAFC]"
                            >
                              Inspect
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
              {activeTab === 'announcements' && <Megaphone size={24} />}
              {activeTab === 'campaigns' && <Target size={24} />}
              {activeTab === 'templates' && <LayoutTemplate size={24} />}
            </div>
            <h3 className="text-sm font-medium text-[#E2E8F0] capitalize">{tabs.find(t => t.id === activeTab)?.label} Hub</h3>
            <p className="mt-1 max-w-sm text-xs text-[#64748B]">
              The infrastructure for {activeTab} is configured. Campaign management and template editors will be activated in a future release.
            </p>
          </div>
        )}
      </div>

      <NotificationDetailsDrawer logId={selectedLogId} onClose={() => setSelectedLogId(null)} />
    </div>
  );
}
