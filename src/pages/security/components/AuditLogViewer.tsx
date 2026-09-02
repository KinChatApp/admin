import { useState } from 'react';
import { Search, Filter, ShieldAlert, Activity, UserCog } from 'lucide-react';
import { useAuditLogs } from '../hooks/useSecurityData';

export function AuditLogViewer() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: logs, isLoading } = useAuditLogs(searchQuery);

  const getLogIcon = (action: string) => {
    if (action.includes('suspend') || action.includes('ban') || action.includes('delete')) return <ShieldAlert size={14} className="text-[#F87171]" />;
    if (action.includes('permission') || action.includes('role')) return <UserCog size={14} className="text-[#FBBF24]" />;
    return <Activity size={14} className="text-[#60A5FA]" />;
  };

  const timeAgo = (dateString: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div className="animate-rise-in space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input 
            type="text" 
            placeholder="Search audit events (e.g., 'suspended', 'changed')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-md border border-[#1E3A5F] bg-[#0D1B2A] pl-9 pr-4 text-sm text-[#F8FAFC] outline-none transition-colors focus:border-[#2563EB]"
          />
        </div>
        <button className="flex h-10 items-center gap-2 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-3 text-sm text-[#64748B] hover:text-[#F8FAFC]">
          <Filter size={16} /> Filter Logs
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#1E3A5F] bg-[#0D1B2A]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#1E3A5F] bg-[#07111F] text-xs uppercase text-[#64748B]">
              <tr>
                <th className="px-5 py-4 font-mono-data font-medium">Actor</th>
                <th className="px-5 py-4 font-mono-data font-medium">Event Description</th>
                <th className="px-5 py-4 font-mono-data font-medium">Time</th>
                <th className="px-5 py-4 font-mono-data font-medium text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E3A5F]/50">
              {isLoading ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-[#64748B]">Loading audit trails...</td></tr>
              ) : logs?.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-[#64748B]">No matching audit logs found.</td></tr>
              ) : (
                logs?.map((log) => (
                  <tr key={log.id} className="transition-colors hover:bg-[#12243A]/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="grid h-6 w-6 place-items-center rounded bg-[#1D4ED8] text-[9px] font-bold text-white">
                          {log.actor?.display_name?.charAt(0).toUpperCase() || 'S'}
                        </div>
                        <span className="font-medium text-[#E2E8F0]">{log.actor?.display_name || 'System'}</span>
                        <span className="rounded bg-[#1E3A5F] px-1.5 py-0.5 text-[9px] uppercase text-[#94A3B8]">{log.actor?.role || 'SYS'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="rounded bg-[#12243A] p-1.5">{getLogIcon(log.action.toLowerCase())}</div>
                        <span className="text-[#F8FAFC]">
                          <span className="font-medium">{log.actor?.display_name || 'System'}</span> {log.action} <span className="text-[#94A3B8] font-mono-data text-xs">{log.target_type && log.target_id ? `${log.target_type} #${log.target_id.substring(0,6)}` : ''}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-mono-data text-xs text-[#94A3B8]">
                      {timeAgo(log.created_at)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-xs text-[#60A5FA] hover:text-[#F8FAFC]">Inspect</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
