import { X, Users, MessageSquare, Clock, ShieldAlert, UserPlus, Settings, BarChart2 } from 'lucide-react';
import { useChatDetails } from '../hooks/useCommunicationData';

export function ChatDetailsDrawer({ chatId, onClose }: { chatId: string | null, onClose: () => void }) {
  const { data, isLoading } = useChatDetails(chatId);

  if (!chatId) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-[#020914]/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-[#1E3A5F] bg-[#07111F] shadow-2xl transition-transform duration-300 sm:w-[480px]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1E3A5F] px-5 py-4">
          <h2 className="text-lg font-semibold text-[#F8FAFC] flex items-center gap-2">
            {data?.chat?.is_group ? <Users size={18} className="text-[#8B5CF6]" /> : <MessageSquare size={18} className="text-[#60A5FA]" />}
            Communication Details
          </h2>
          <button onClick={onClose} className="rounded p-1 text-[#64748B] hover:bg-[#12243A] hover:text-[#F8FAFC]">
            <X size={20} />
          </button>
        </div>

        {isLoading || !data?.chat ? (
          <div className="flex flex-1 items-center justify-center text-sm text-[#64748B]">Loading chat architecture...</div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 quiet-scrollbar">
            
            {/* Core Info */}
            <div className="mb-6 rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5">
              <div className="flex items-center gap-4">
                <div className={`grid h-14 w-14 place-items-center rounded-xl text-xl font-bold text-white shadow-lg ${data.chat.is_group ? 'bg-[#8B5CF6]' : 'bg-[#1D4ED8]'}`}>
                  {data.chat.is_group ? <Users size={24} /> : (data.chat.title ? data.chat.title.charAt(0) : 'P')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#F8FAFC]">
                    {data.chat.title || (data.chat.is_group ? 'Unnamed Group' : 'Private Conversation')}
                  </h3>
                  <p className="text-xs text-[#64748B] font-mono-data mt-1">ID: {data.chat.id}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-[#1E3A5F] pt-4">
                <div>
                  <p className="text-xs font-mono-data text-[#64748B] uppercase tracking-wider">Created</p>
                  <p className="text-sm text-[#F8FAFC] mt-1">{new Date(data.chat.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs font-mono-data text-[#64748B] uppercase tracking-wider">Last Activity</p>
                  <p className="text-sm text-[#F8FAFC] mt-1">{new Date(data.chat.updated_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider">Participants ({data.participants.length})</h4>
              </div>
              <div className="space-y-2">
                {data.participants.map((p: any) => {
                  const userStats = data.stats.find((s: any) => s.user_id === p.user_id);
                  return (
                    <div key={p.user_id} className="flex items-center justify-between rounded border border-[#1E3A5F] bg-[#0D1B2A] p-3">
                      <div>
                        <p className="text-sm font-medium text-[#F8FAFC] flex items-center gap-2">
                          {p.user?.display_name || 'Unknown User'}
                          {p.role === 'admin' && <span className="rounded bg-[#422006] px-1.5 py-0.5 text-[9px] text-[#FBBF24] uppercase">Admin</span>}
                        </p>
                        <p className="text-[10px] text-[#64748B] mt-0.5">Joined: {new Date(p.joined_at).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#60A5FA] font-mono-data">{userStats?.total_messages || 0} msgs</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Future Group Features (Shown only if it's a group) */}
            {data.chat.is_group && (
              <div className="mb-6 space-y-3">
                <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider">Group Administration (Future)</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button disabled className="flex items-center gap-2 rounded border border-[#1E3A5F] border-dashed bg-transparent p-2.5 text-xs text-[#64748B] opacity-60">
                    <Settings size={14} /> Group Settings
                  </button>
                  <button disabled className="flex items-center gap-2 rounded border border-[#1E3A5F] border-dashed bg-transparent p-2.5 text-xs text-[#64748B] opacity-60">
                    <BarChart2 size={14} /> Group Reports
                  </button>
                  <button disabled className="flex items-center gap-2 rounded border border-[#1E3A5F] border-dashed bg-transparent p-2.5 text-xs text-[#64748B] opacity-60">
                    <UserPlus size={14} /> Manage Members
                  </button>
                </div>
              </div>
            )}

            {/* Moderation Actions */}
            <div className="border-t border-[#1E3A5F] pt-4 mt-4">
              <h4 className="text-xs font-mono-data font-semibold text-[#F87171] uppercase tracking-wider mb-3 flex items-center gap-1.5"><ShieldAlert size={14} /> Chat Moderation</h4>
              <div className="flex flex-col gap-2">
                <button className="flex items-center justify-center gap-2 rounded border border-[#991B1B] bg-[#450A0A]/50 px-3 py-2 text-xs font-medium text-[#FECACA] hover:bg-[#7F1D1D]">
                   Dissolve / Delete Conversation
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
}
