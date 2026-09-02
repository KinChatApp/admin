import { X, Bell, User, Smartphone, AlertOctagon, CheckCircle2, Clock, TerminalSquare } from 'lucide-react';
import { useNotificationDetails } from '../hooks/useEngagementData';

export function NotificationDetailsDrawer({ logId, onClose }: { logId: string | null, onClose: () => void }) {
  const { data: log, isLoading } = useNotificationDetails(logId);

  if (!logId) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-[#020914]/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-[#1E3A5F] bg-[#07111F] shadow-2xl transition-transform duration-300 sm:w-[480px]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1E3A5F] px-5 py-4">
          <h2 className="text-lg font-semibold text-[#F8FAFC] flex items-center gap-2">
            <Bell size={18} className="text-[#60A5FA]" />
            Push Delivery Details
          </h2>
          <button onClick={onClose} className="rounded p-1 text-[#64748B] hover:bg-[#12243A] hover:text-[#F8FAFC]">
            <X size={20} />
          </button>
        </div>

        {isLoading || !log ? (
          <div className="flex flex-1 items-center justify-center text-sm text-[#64748B]">Loading dispatch data...</div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 quiet-scrollbar">
            
            {/* Status Banner */}
            <div className={`mb-6 rounded-lg border p-4 flex items-center justify-between ${
              log.status === 'sent' ? 'border-[#052E1A] bg-[#052E1A]/40' : 
              log.status === 'failed' ? 'border-[#450A0A] bg-[#450A0A]/40' : 'border-[#1E3A5F] bg-[#12243A]/40'
            }`}>
              <div>
                <p className="text-xs text-[#94A3B8] font-mono-data uppercase tracking-wider mb-1">Delivery Status</p>
                <div className="flex items-center gap-1.5">
                  {log.status === 'sent' ? <CheckCircle2 size={16} className="text-[#4ADE80]" /> : 
                   log.status === 'failed' ? <AlertOctagon size={16} className="text-[#F87171]" /> : 
                   <Clock size={16} className="text-[#FBBF24]" />}
                  <p className={`text-lg font-semibold capitalize ${
                    log.status === 'sent' ? 'text-[#4ADE80]' : 
                    log.status === 'failed' ? 'text-[#F87171]' : 'text-[#FBBF24]'
                  }`}>{log.status}</p>
                </div>
              </div>
            </div>

            {/* Notification Content */}
            <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Payload Content</h4>
            <div className="mb-6 rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4">
              <p className="font-semibold text-[#F8FAFC] mb-1">{log.title || 'Untitled Notification'}</p>
              <p className="text-sm text-[#E2E8F0]">{log.body || 'No body content provided.'}</p>
            </div>

            {/* Error Message if Failed */}
            {log.status === 'failed' && log.error_message && (
              <div className="mb-6 rounded-lg border border-[#991B1B]/50 bg-[#450A0A]/30 p-4">
                <h4 className="text-xs font-mono-data font-semibold text-[#F87171] uppercase tracking-wider mb-2">Failure Reason</h4>
                <p className="text-sm font-mono-data text-[#FECACA]">{log.error_message}</p>
              </div>
            )}

            {/* Target Info */}
            <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Dispatch Target</h4>
            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between rounded border border-[#1E3A5F] bg-[#0D1B2A] p-3">
                <div className="flex items-center gap-2 text-sm text-[#E2E8F0]">
                  <User size={15} className="text-[#64748B]" /> User
                </div>
                <span className="font-medium text-[#F8FAFC]">{log.user?.display_name || 'System / All Users'}</span>
              </div>
              {log.device && (
                <div className="flex items-center justify-between rounded border border-[#1E3A5F] bg-[#0D1B2A] p-3">
                  <div className="flex items-center gap-2 text-sm text-[#E2E8F0]">
                    <Smartphone size={15} className="text-[#64748B]" /> Target Device
                  </div>
                  <span className="font-medium text-[#F8FAFC] capitalize">{log.device.device_type} Device</span>
                </div>
              )}
            </div>

            {/* Timeline */}
            <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Timeline</h4>
            <div className="mb-6 rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#64748B]">Created At</span>
                <span className="text-[#F8FAFC]">{new Date(log.created_at).toLocaleString()}</span>
              </div>
              {log.sent_at && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748B]">Dispatched At</span>
                  <span className="text-[#F8FAFC]">{new Date(log.sent_at).toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Raw Data Payload */}
            {log.data && (
              <div className="mb-6">
                <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <TerminalSquare size={14} /> Custom Data (JSON)
                </h4>
                <div className="rounded-lg border border-[#1E3A5F] bg-[#020914] p-3">
                  <pre className="font-mono-data text-[10px] text-[#60A5FA] overflow-x-auto">
                    {JSON.stringify(log.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </>
  );
}
