import { X, Phone, Video, Clock, Activity, Wifi, PhoneOff, AlertTriangle, Users } from 'lucide-react';

export function CallDetailsDrawer({ call, onClose }: { call: any, onClose: () => void }) {
  if (!call) return null;

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '00:00';
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isFailed = ['missed', 'rejected', 'failed', 'cancelled'].includes(call.status);
  const isActive = ['ringing', 'answered'].includes(call.status);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-[#020914]/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-[#1E3A5F] bg-[#07111F] shadow-2xl transition-transform duration-300 sm:w-[480px]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1E3A5F] px-5 py-4">
          <h2 className="text-lg font-semibold text-[#F8FAFC] flex items-center gap-2">
            {call.call_type === 'video' ? <Video size={18} className="text-[#60A5FA]" /> : <Phone size={18} className="text-[#4ADE80]" />}
            Call Session Details
          </h2>
          <button onClick={onClose} className="rounded p-1 text-[#64748B] hover:bg-[#12243A] hover:text-[#F8FAFC]">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 quiet-scrollbar">
          
          {/* Status Banner */}
          <div className={`mb-6 rounded-lg border p-4 flex items-center justify-between ${
            isActive ? 'border-[#052E1A] bg-[#052E1A]/40' : 
            isFailed ? 'border-[#450A0A] bg-[#450A0A]/40' : 
            'border-[#1E3A5F] bg-[#12243A]/40'
          }`}>
            <div>
              <p className="text-xs text-[#94A3B8] font-mono-data uppercase tracking-wider mb-1">Session Status</p>
              <p className={`text-lg font-semibold capitalize ${
                isActive ? 'text-[#4ADE80]' : isFailed ? 'text-[#F87171]' : 'text-[#F8FAFC]'
              }`}>{call.status}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#94A3B8] font-mono-data uppercase tracking-wider mb-1">Duration</p>
              <p className="text-xl font-mono-data text-[#F8FAFC]">{formatDuration(call.duration)}</p>
            </div>
          </div>

          {/* Participants */}
          <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Participants</h4>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-6 rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4">
            <div className="text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#1D4ED8] text-sm font-bold text-white mb-2">
                {call.caller?.display_name?.charAt(0).toUpperCase() || 'C'}
              </div>
              <p className="text-sm font-medium text-[#F8FAFC] truncate">{call.caller?.display_name}</p>
              <p className="text-[10px] text-[#64748B]">Caller</p>
            </div>
            <div className="text-[#64748B]">
              {isFailed ? <PhoneOff size={20} className="text-[#F87171]" /> : <Activity size={20} className="text-[#60A5FA]" />}
            </div>
            <div className="text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#047857] text-sm font-bold text-white mb-2">
                {call.receiver?.display_name?.charAt(0).toUpperCase() || 'R'}
              </div>
              <p className="text-sm font-medium text-[#F8FAFC] truncate">{call.receiver?.display_name}</p>
              <p className="text-[10px] text-[#64748B]">Receiver</p>
            </div>
          </div>

          {/* Timeline */}
          <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Session Timeline</h4>
          <div className="mb-6 rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-[#64748B]"><Clock size={15} /> Initiated</span>
              <span className="text-[#F8FAFC]">{new Date(call.created_at).toLocaleString()}</span>
            </div>
            {call.answered_at && (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-[#64748B]"><Phone size={15} /> Answered</span>
                <span className="text-[#4ADE80]">{new Date(call.answered_at).toLocaleTimeString()}</span>
              </div>
            )}
            {call.ended_at && (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-[#64748B]"><PhoneOff size={15} /> Ended</span>
                <span className="text-[#94A3B8]">{new Date(call.ended_at).toLocaleTimeString()}</span>
              </div>
            )}
          </div>

          {/* Call Quality (Placeholder for future implementation) */}
          <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Call Quality (Telemetry)</h4>
          <div className="mb-6 rounded-lg border border-[#1E3A5F] border-dashed bg-[#0D1B2A]/50 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="flex items-center gap-1.5 text-xs text-[#64748B]"><Wifi size={13} /> Average Latency</p>
                <p className="mt-1 font-mono-data text-sm text-[#F8FAFC]">42ms <span className="text-[10px] text-[#4ADE80]">Good</span></p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-xs text-[#64748B]"><AlertTriangle size={13} /> Packet Loss</p>
                <p className="mt-1 font-mono-data text-sm text-[#F8FAFC]">0.2% <span className="text-[10px] text-[#4ADE80]">Stable</span></p>
              </div>
            </div>
            <p className="mt-3 text-[10px] text-[#64748B] italic">* Telemetry data is simulated until WebRTC metrics pipeline is live.</p>
          </div>

          {/* Future Modules */}
          <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Future Infrastructure</h4>
          <div className="rounded-lg border border-[#1E3A5F] bg-[#07111F] p-4 space-y-2">
            <div className="flex items-center gap-3 opacity-50">
              <Users size={16} className="text-[#64748B]" />
              <p className="text-sm text-[#94A3B8]">Group & Conference Calls <span className="ml-2 text-[10px] border border-[#1E3A5F] px-1.5 rounded text-[#64748B]">Upcoming</span></p>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <Monitor size={16} className="text-[#64748B]" />
              <p className="text-sm text-[#94A3B8]">Screen Sharing Sessions <span className="ml-2 text-[10px] border border-[#1E3A5F] px-1.5 rounded text-[#64748B]">Upcoming</span></p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
