import { useState } from 'react';
import { Phone, Video, Filter, PhoneOff, Activity, PhoneCall } from 'lucide-react';
import { TinyLabel } from '@/components/layout/tiny-label';
import { useCalls, useCallSummary } from './hooks/useCallsData';
import { CallDetailsDrawer } from './components/CallDetailsDrawer';

export default function CallsPage() {
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCall, setSelectedCall] = useState<any | null>(null);

  const { data: calls, isLoading } = useCalls(typeFilter, statusFilter);
  const { data: summary } = useCallSummary();

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '--';
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="panel-grid min-h-full">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        
        {/* Header Section */}
        <div className="animate-rise-in mb-8">
          <TinyLabel>Communication</TinyLabel>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-[32px]">
            Calls Infrastructure
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[#94A3B8]">
            Monitor active sessions, call quality telemetry, and historical connection data.
          </p>
        </div>

        {/* Summary Stats Row */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5">
            <div className="flex items-center gap-2 text-[#64748B] mb-2"><PhoneCall size={16} /><span className="text-xs font-medium uppercase tracking-wider">Total Today</span></div>
            <p className="text-2xl font-mono-data font-semibold text-[#F8FAFC]">{summary?.totalToday || 0}</p>
          </div>
          <div className="rounded-lg border border-[#052E1A] bg-[#052E1A]/20 p-5">
            <div className="flex items-center gap-2 text-[#4ADE80] mb-2"><Activity size={16} /><span className="text-xs font-medium uppercase tracking-wider">Active Now</span></div>
            <p className="text-2xl font-mono-data font-semibold text-[#4ADE80]">{summary?.activeNow || 0}</p>
          </div>
          <div className="rounded-lg border border-[#450A0A] bg-[#450A0A]/20 p-5">
            <div className="flex items-center gap-2 text-[#F87171] mb-2"><PhoneOff size={16} /><span className="text-xs font-medium uppercase tracking-wider">Failed / Missed</span></div>
            <p className="text-2xl font-mono-data font-semibold text-[#F87171]">{summary?.failedToday || 0}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-3 text-sm text-[#F8FAFC] outline-none focus:border-[#2563EB]"
            >
              <option value="all">All Types</option>
              <option value="audio">Audio Calls</option>
              <option value="video">Video Calls</option>
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-3 text-sm text-[#F8FAFC] outline-none focus:border-[#2563EB]"
            >
              <option value="all">All Status</option>
              <option value="active">Active (Ringing/Answered)</option>
              <option value="ended">Completed</option>
              <option value="failed">Failed/Missed</option>
            </select>
            <button className="hidden sm:flex h-10 items-center gap-2 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-3 text-sm text-[#64748B] hover:text-[#F8FAFC]">
              <Filter size={16} /> Advanced Filter
            </button>
          </div>
        </div>

        {/* Calls Table */}
        <div className="overflow-hidden rounded-lg border border-[#1E3A5F] bg-[#0D1B2A]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#1E3A5F] bg-[#07111F] text-xs uppercase text-[#64748B]">
                <tr>
                  <th className="px-5 py-4 font-mono-data font-medium">Type</th>
                  <th className="px-5 py-4 font-mono-data font-medium">Participants</th>
                  <th className="px-5 py-4 font-mono-data font-medium">Status</th>
                  <th className="px-5 py-4 font-mono-data font-medium">Duration</th>
                  <th className="px-5 py-4 font-mono-data font-medium">Time</th>
                  <th className="px-5 py-4 font-mono-data font-medium text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E3A5F]">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-[#64748B]">Loading call sessions...</td>
                  </tr>
                ) : calls?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-[#64748B]">No calls found matching criteria.</td>
                  </tr>
                ) : (
                  calls?.map((call) => {
                    const isFailed = ['missed', 'rejected', 'failed', 'cancelled'].includes(call.status);
                    const isActive = ['ringing', 'answered'].includes(call.status);
                    return (
                      <tr key={call.id} className="transition-colors hover:bg-[#12243A]/50">
                        <td className="px-5 py-3">
                          <div className={`grid h-8 w-8 place-items-center rounded bg-[#12243A] ${call.call_type === 'video' ? 'text-[#60A5FA]' : 'text-[#4ADE80]'}`}>
                            {call.call_type === 'video' ? <Video size={16} /> : <Phone size={16} />}
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[#F8FAFC]">{call.caller?.display_name || 'Unknown'}</span>
                            <span className="text-[#64748B]">→</span>
                            <span className="text-[#E2E8F0]">{call.receiver?.display_name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                            isActive ? 'bg-[#052E1A] text-[#4ADE80]' : 
                            isFailed ? 'bg-[#450A0A] text-[#F87171]' : 'bg-[#1E3A5F] text-[#94A3B8]'
                          }`}>
                            {call.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 font-mono-data text-[#94A3B8]">
                          {formatDuration(call.duration)}
                        </td>
                        <td className="px-5 py-3 text-[#94A3B8]">
                          {new Date(call.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button 
                            onClick={() => setSelectedCall(call)}
                            className="inline-flex h-8 items-center justify-center rounded border border-[#1E3A5F] bg-transparent px-3 text-xs text-[#60A5FA] hover:bg-[#1E3A5F] hover:text-[#F8FAFC]"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CallDetailsDrawer call={selectedCall} onClose={() => setSelectedCall(null)} />
    </div>
  );
}
