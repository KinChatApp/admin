import { useState } from 'react';
import { 
  X, ShieldAlert, Smartphone, Monitor, Clock, Activity, 
  Mail, Phone, ShieldCheck, Ban, Trash2, PowerOff, ShieldX
} from 'lucide-react';
import { useUserDetails } from '../hooks/useUsersData';

export function UserProfileDrawer({ userId, onClose }: { userId: string | null, onClose: () => void }) {
  const { data, isLoading } = useUserDetails(userId);
  const [activeTab, setActiveTab] = useState<'overview' | 'devices' | 'management'>('overview');

  if (!userId) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-[#020914]/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-[#1E3A5F] bg-[#07111F] shadow-2xl transition-transform duration-300 sm:w-[480px]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1E3A5F] px-5 py-4">
          <h2 className="text-lg font-semibold text-[#F8FAFC]">User Identity</h2>
          <button onClick={onClose} className="rounded p-1 text-[#64748B] hover:bg-[#12243A] hover:text-[#F8FAFC]">
            <X size={20} />
          </button>
        </div>

        {isLoading || !data?.profile ? (
          <div className="flex flex-1 items-center justify-center text-sm text-[#64748B]">Loading identity data...</div>
        ) : (
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Profile Hero */}
            <div className="border-b border-[#1E3A5F] bg-[#0D1B2A] px-6 py-6">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-[#1D4ED8] text-xl font-bold text-white shadow-lg">
                  {data.profile.display_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#F8FAFC]">{data.profile.display_name}</h3>
                  <div className="mt-1 flex items-center gap-2 text-xs">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
                      data.profile.status === 'active' ? 'bg-[#052E1A] text-[#4ADE80]' : 
                      data.profile.status === 'suspended' ? 'bg-[#422006] text-[#FBBF24]' : 'bg-[#450A0A] text-[#F87171]'
                    }`}>
                      {data.profile.status.toUpperCase()}
                    </span>
                    <span className={`inline-flex items-center gap-1 ${data.profile.is_online ? 'text-[#4ADE80]' : 'text-[#64748B]'}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${data.profile.is_online ? 'bg-[#4ADE80]' : 'bg-[#64748B]'}`}></span>
                      {data.profile.is_online ? 'Online now' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#1E3A5F] bg-[#0D1B2A] px-2">
              {[
                { id: 'overview', label: 'Overview & Stats' },
                { id: 'devices', label: 'Devices & Sessions' },
                { id: 'management', label: 'Account Management' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id ? 'border-[#60A5FA] text-[#F8FAFC]' : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-5 quiet-scrollbar">
              
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-rise-in">
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider">Contact Details</h4>
                    <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-[#64748B]"><Phone size={15} /> Phone</span>
                        <span className="text-[#F8FAFC]">{data.profile.phone || 'Not provided'}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-[#64748B]"><Mail size={15} /> Email</span>
                        <span className="text-[#F8FAFC]">{data.profile.email || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider">Verification Status</h4>
                    <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#64748B]">Phone Verification</span>
                        <span className={`flex items-center gap-1 ${data.profile.phone ? 'text-[#4ADE80]' : 'text-[#64748B]'}`}>
                           {data.profile.phone ? <ShieldCheck size={14} /> : <ShieldX size={14} />}
                           {data.profile.phone ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                         <span className="text-[#64748B]">Email Verification</span>
                        <span className={`flex items-center gap-1 ${data.profile.email ? 'text-[#4ADE80]' : 'text-[#64748B]'}`}>
                           {data.profile.email ? <ShieldCheck size={14} /> : <ShieldX size={14} />}
                           {data.profile.email ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm pt-2 border-t border-[#1E3A5F]">
                        <span className="text-[#64748B]">Overall Identity</span>
                        <span className={`flex items-center gap-1 ${data.profile.is_verified ? 'text-[#4ADE80]' : 'text-[#FBBF24]'}`}>
                           {data.profile.is_verified ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                           {data.profile.is_verified ? 'Verified Account' : 'Pending Verification'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider">Activity Statistics</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4">
                        <Activity size={16} className="text-[#60A5FA] mb-2" />
                        <p className="text-xs text-[#64748B]">Messages Sent</p>
                        <p className="text-xl font-mono-data font-semibold text-[#F8FAFC]">{data.stats?.total_messages_sent?.toLocaleString() || 0}</p>
                      </div>
                      <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4">
                        <Clock size={16} className="text-[#60A5FA] mb-2" />
                        <p className="text-xs text-[#64748B]">Last Active</p>
                        <p className="text-[13px] font-medium text-[#F8FAFC] mt-1">
                          {data.profile.last_seen ? new Date(data.profile.last_seen).toLocaleDateString() : 'Unknown'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DEVICES TAB */}
              {activeTab === 'devices' && (
                <div className="space-y-4 animate-rise-in">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider">Active Sessions</h4>
                    <button className="text-xs text-[#F87171] hover:text-[#FECACA] flex items-center gap-1">
                      <PowerOff size={13} /> Force logout all
                    </button>
                  </div>
                  <div className="space-y-2">
                    {data.devices.length === 0 ? (
                      <p className="text-sm text-[#64748B] text-center py-4">No active devices found.</p>
                    ) : (
                      data.devices.map(device => (
                        <div key={device.id} className="flex items-center justify-between rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-3 sm:p-4">
                          <div className="flex items-center gap-3">
                            <div className="rounded-md bg-[#12243A] p-2 text-[#60A5FA]">
                              {device.device_type === 'web' ? <Monitor size={16} /> : <Smartphone size={16} />}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#F8FAFC] capitalize">{device.device_type} Device</p>
                              <p className="text-[11px] text-[#64748B]">
                                Last synced: {new Date(device.updated_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {device.is_active && (
                            <span className="rounded bg-[#052E1A] px-2 py-1 text-[10px] font-medium text-[#4ADE80]">Active</span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* MANAGEMENT TAB */}
              {activeTab === 'management' && (
                <div className="space-y-6 animate-rise-in">
                  <div className="rounded-lg border border-[#422006] bg-[#2A1508]/30 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldAlert size={18} className="text-[#FBBF24] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-[#FBBF24]">Account Restrictions</h4>
                        <p className="text-xs text-[#FDE68A]/70 mt-1 mb-3">Temporarily disable account access or limit features.</p>
                        <div className="flex flex-wrap gap-2">
                          <button className="rounded border border-[#F59E0B] bg-[#78350F]/50 px-3 py-1.5 text-xs font-medium text-[#FBBF24] hover:bg-[#78350F]">
                            Suspend Account
                          </button>
                          <button className="rounded border border-[#1E3A5F] bg-[#0D1B2A] px-3 py-1.5 text-xs font-medium text-[#F8FAFC] hover:bg-[#12243A]">
                            Remove Restrictions
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#7F1D1D] bg-[#450A0A]/30 p-4">
                    <div className="flex items-start gap-3">
                      <Ban size={18} className="text-[#F87171] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-[#F87171]">Danger Zone</h4>
                        <p className="text-xs text-[#FECACA]/70 mt-1 mb-4">Permanent actions that cannot be easily undone.</p>
                        <div className="flex flex-col gap-2">
                          <button className="flex items-center justify-center gap-2 rounded border border-[#991B1B] bg-[#7F1D1D]/50 px-3 py-2 text-xs font-medium text-[#FECACA] hover:bg-[#7F1D1D]">
                            <Ban size={14} /> Permanent Ban
                          </button>
                          <button className="flex items-center justify-center gap-2 rounded border border-[#991B1B] bg-transparent px-3 py-2 text-xs font-medium text-[#F87171] hover:bg-[#450A0A]">
                            <Trash2 size={14} /> Delete Account & Data
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Future Accounts Placeholder */}
                  <div className="border-t border-[#1E3A5F] pt-4 mt-4">
                    <h4 className="text-xs font-mono-data font-semibold text-[#64748B] uppercase tracking-wider mb-2">Future Migrations</h4>
                    <button disabled className="w-full rounded border border-[#1E3A5F] border-dashed bg-transparent px-3 py-2.5 text-xs text-[#64748B] opacity-60">
                      Convert to Business/Creator Account (Coming Soon)
                    </button>
                  </div>

                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
