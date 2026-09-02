import { useState } from 'react';
import { ShieldCheck, Users, Key, History, Smartphone, ShieldAlert } from 'lucide-react';
import { TinyLabel } from '@/components/layout/tiny-label';
import { AuditLogViewer } from './components/AuditLogViewer';
import { RolesPermissions } from './components/RolesPermissions';
import { useAdmins } from './hooks/useSecurityData';

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState<'audit_logs' | 'admins' | 'roles' | 'sessions' | 'events'>('audit_logs');
  const { data: admins, isLoading: adminsLoading } = useAdmins();

  const tabs = [
    { id: 'audit_logs', label: 'Audit Logs', icon: History },
    { id: 'admins', label: 'Admin List', icon: Users },
    { id: 'roles', label: 'Roles & Permissions', icon: Key },
    { id: 'sessions', label: 'Admin Sessions', icon: Smartphone },
    { id: 'events', label: 'Security Events', icon: ShieldAlert },
  ] as const;

  return (
    <div className="panel-grid min-h-full">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        
        {/* Header Section */}
        <div className="animate-rise-in mb-8">
          <TinyLabel>Access Control</TinyLabel>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-[32px]">
            Security Command Center
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[#94A3B8]">
            Manage platform administrators, granular permissions, and review immutable audit trails.
          </p>
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
              </button>
            );
          })}
        </div>

        {/* Active Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'audit_logs' && <AuditLogViewer />}
          {activeTab === 'roles' && <RolesPermissions />}
          
          {activeTab === 'admins' && (
            <div className="animate-rise-in overflow-hidden rounded-lg border border-[#1E3A5F] bg-[#0D1B2A]">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#1E3A5F] bg-[#07111F] text-xs uppercase text-[#64748B]">
                  <tr>
                    <th className="px-5 py-4 font-mono-data font-medium">Administrator</th>
                    <th className="px-5 py-4 font-mono-data font-medium">Assigned Role</th>
                    <th className="px-5 py-4 font-mono-data font-medium">Status</th>
                    <th className="px-5 py-4 font-mono-data font-medium text-right">Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E3A5F]">
                  {adminsLoading ? (
                    <tr><td colSpan={4} className="px-5 py-8 text-center text-[#64748B]">Loading personnel...</td></tr>
                  ) : admins?.map(admin => (
                    <tr key={admin.id} className="transition-colors hover:bg-[#12243A]/50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="grid h-8 w-8 place-items-center rounded bg-[#1D4ED8] text-xs font-bold text-white">
                            {admin.display_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-[#F8FAFC]">{admin.display_name}</p>
                            <p className="text-[10px] text-[#64748B]">{admin.email || 'No email associated'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-1.5 text-xs text-[#E2E8F0] capitalize">
                          <ShieldCheck size={14} className={admin.role === 'admin' ? 'text-[#FBBF24]' : 'text-[#60A5FA]'} />
                          {admin.role}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="rounded bg-[#052E1A] px-2 py-1 text-[10px] uppercase font-medium text-[#4ADE80]">Active</span>
                      </td>
                      <td className="px-5 py-3 text-right">
                         <button className="text-xs font-medium text-[#60A5FA] hover:text-[#F8FAFC]">Edit Access</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Placeholders for Sessions & Events */}
          {['sessions', 'events'].includes(activeTab) && (
            <div className="flex h-[350px] flex-col items-center justify-center rounded-lg border border-[#1E3A5F] border-dashed bg-[#0D1B2A]/50 px-4 text-center">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-[#12243A] text-[#64748B]">
                {activeTab === 'sessions' ? <Smartphone size={24} /> : <ShieldAlert size={24} />}
              </div>
              <h3 className="text-sm font-medium text-[#E2E8F0] capitalize">Admin {activeTab}</h3>
              <p className="mt-1 max-w-sm text-xs text-[#64748B]">
                Tracking for active admin sessions, IP logs, and security alerts will be integrated in the advanced security module.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
