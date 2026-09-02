import { X, ShieldAlert, UserX, MessageSquare, AlertOctagon, CheckCircle2, XCircle, Info } from 'lucide-react';
import { useReportDetails } from '../hooks/useSafetyData';

export function ReportDetailsDrawer({ reportId, onClose }: { reportId: string | null, onClose: () => void }) {
  const { data: report, isLoading } = useReportDetails(reportId);

  if (!reportId) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-[#020914]/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-[#1E3A5F] bg-[#07111F] shadow-2xl transition-transform duration-300 sm:w-[500px]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1E3A5F] px-5 py-4">
          <h2 className="text-lg font-semibold text-[#F8FAFC] flex items-center gap-2">
            <ShieldAlert size={18} className="text-[#F87171]" />
            Moderation Review
          </h2>
          <button onClick={onClose} className="rounded p-1 text-[#64748B] hover:bg-[#12243A] hover:text-[#F8FAFC]">
            <X size={20} />
          </button>
        </div>

        {isLoading || !report ? (
          <div className="flex flex-1 items-center justify-center text-sm text-[#64748B]">Loading incident details...</div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 quiet-scrollbar">
            
            {/* Report Banner */}
            <div className={`mb-6 rounded-lg border p-4 ${
              report.status === 'pending' ? 'border-[#422006] bg-[#2A1508]/40' : 
              report.status === 'resolved' ? 'border-[#052E1A] bg-[#052E1A]/40' : 'border-[#1E3A5F] bg-[#12243A]/40'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono-data text-[#94A3B8] uppercase tracking-wider mb-1">Status</p>
                  <p className={`text-lg font-bold capitalize ${
                    report.status === 'pending' ? 'text-[#FBBF24]' : 
                    report.status === 'resolved' ? 'text-[#4ADE80]' : 'text-[#94A3B8]'
                  }`}>{report.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono-data text-[#94A3B8] uppercase tracking-wider mb-1">Reported On</p>
                  <p className="text-sm font-medium text-[#F8FAFC]">{new Date(report.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Core Complaint */}
            <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Incident Summary</h4>
            <div className="mb-6 rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-[#1E3A5F] px-2 py-0.5 text-[10px] font-mono-data uppercase text-[#94A3B8]">
                  Target: {report.target_type}
                </span>
                <span className="rounded bg-[#450A0A] px-2 py-0.5 text-[10px] font-mono-data uppercase text-[#F87171]">
                  Reason: {report.reason}
                </span>
              </div>
              <p className="text-sm text-[#E2E8F0]">
                <span className="font-semibold text-[#64748B]">Reporter's note:</span> {report.description || 'No additional details provided by the reporter.'}
              </p>
            </div>

            {/* Target Details (Context) */}
            <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Reported Content Context</h4>
            <div className="mb-6 rounded-lg border border-[#1E3A5F] bg-[#020914] p-4 space-y-4">
              
              {/* If User was reported */}
              {report.target_type === 'user' && report.reported_user && (
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1D4ED8] text-white">
                    <UserX size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#F8FAFC]">User: {report.reported_user.display_name}</p>
                    <p className="text-[11px] text-[#64748B]">Account Status: <span className="capitalize">{report.reported_user.status}</span></p>
                  </div>
                </div>
              )}

              {/* If Message was reported */}
              {report.target_type === 'message' && report.message && (
                <div className="rounded border border-[#1E3A5F] bg-[#0D1B2A] p-3">
                  <p className="flex items-center gap-1.5 text-[11px] text-[#64748B] mb-2 border-b border-[#1E3A5F] pb-2">
                    <MessageSquare size={12} /> Message Content
                  </p>
                  <p className={`text-sm ${report.message.deleted_at ? 'italic text-[#64748B]' : 'text-[#F8FAFC]'}`}>
                    {report.message.content || '[Media/Attachment]'}
                  </p>
                  {report.message.deleted_at && (
                    <p className="text-[10px] text-[#F87171] mt-2 flex items-center gap-1"><Info size={10} /> Message was deleted</p>
                  )}
                </div>
              )}
            </div>

            {/* Reporter Info */}
            <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Submitted By</h4>
            <div className="mb-6 flex items-center justify-between rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-3">
              <span className="text-sm font-medium text-[#F8FAFC]">{report.reporter?.display_name || 'System'}</span>
              <span className="text-[10px] text-[#64748B] font-mono-data">ID: {report.reporter_id.substring(0, 8)}...</span>
            </div>

            {/* Action Panel */}
            <div className="border-t border-[#1E3A5F] pt-4 mt-6">
              <h4 className="text-xs font-mono-data font-semibold text-[#F8FAFC] uppercase tracking-wider mb-3">Moderation Actions</h4>
              
              {report.status === 'pending' ? (
                <div className="space-y-2">
                  <button className="flex w-full items-center justify-center gap-2 rounded border border-[#052E1A] bg-[#064E3B]/40 px-3 py-2.5 text-sm font-medium text-[#4ADE80] hover:bg-[#064E3B]">
                    <CheckCircle2 size={16} /> Mark as Resolved (Take Action)
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 rounded border border-[#1E3A5F] bg-[#0D1B2A] px-3 py-2.5 text-sm font-medium text-[#94A3B8] hover:bg-[#12243A] hover:text-[#F8FAFC]">
                    <XCircle size={16} /> Dismiss (False Flag)
                  </button>
                  <div className="pt-2">
                    <button className="flex w-full items-center justify-center gap-2 rounded border border-[#991B1B] bg-transparent px-3 py-2 text-xs font-medium text-[#F87171] hover:bg-[#450A0A]">
                      <AlertOctagon size={14} /> Ban Offending User
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg bg-[#0D1B2A] p-4 text-center">
                  <p className="text-sm text-[#94A3B8]">This report has already been processed.</p>
                  <p className="text-[11px] text-[#64748B] mt-1">Status: {report.status.toUpperCase()}</p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </>
  );
}
