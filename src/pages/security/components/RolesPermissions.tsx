import { Key, Shield, Eye, Edit2, Trash2 } from 'lucide-react';

export function RolesPermissions() {
  // Static representation of Granular Permissions based on user requirements
  const roles = [
    { name: 'Super Admin', description: 'Full platform access without restrictions.', color: 'text-[#FBBF24]', bg: 'bg-[#FBBF24]/10' },
    { name: 'Moderator', description: 'Can read and moderate content, but cannot alter platform settings.', color: 'text-[#60A5FA]', bg: 'bg-[#60A5FA]/10' },
    { name: 'Analyst', description: 'Read-only access to analytics and metrics.', color: 'text-[#4ADE80]', bg: 'bg-[#4ADE80]/10' },
  ];

  const permissions = [
    { category: 'Users', perms: ['users.read', 'users.suspend', 'users.ban'] },
    { category: 'Content', perms: ['messages.read', 'messages.delete'] },
    { category: 'Safety', perms: ['reports.read', 'reports.resolve'] },
    { category: 'Intelligence', perms: ['analytics.read', 'audit_logs.read'] },
    { category: 'System', perms: ['settings.write', 'feature_flags.write', 'admins.manage'] },
  ];

  return (
    <div className="animate-rise-in space-y-6">
      
      {/* Roles Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        {roles.map(role => (
          <div key={role.name} className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5">
            <h4 className={`text-sm font-semibold flex items-center gap-2 ${role.color}`}>
              <Shield size={16} /> {role.name}
            </h4>
            <p className="mt-2 text-xs text-[#94A3B8]">{role.description}</p>
            <button className="mt-4 text-xs font-medium text-[#E2E8F0] hover:text-white underline decoration-[#1E3A5F] underline-offset-4">Edit Role</button>
          </div>
        ))}
      </div>

      {/* Granular Permissions Matrix */}
      <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5 sm:p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#F8FAFC] flex items-center gap-2"><Key size={18} className="text-[#60A5FA]"/> Granular Permissions Matrix</h3>
          <p className="text-sm text-[#94A3B8] mt-1">Configure exactly what each role is authorized to perform via ABAC (Attribute-Based Access Control).</p>
        </div>

        <div className="space-y-6">
          {permissions.map(group => (
            <div key={group.category}>
              <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider border-b border-[#1E3A5F] pb-2 mb-3">
                {group.category}
              </h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.perms.map(p => (
                  <div key={p} className="flex items-center justify-between rounded border border-[#1E3A5F] bg-[#07111F] p-3">
                    <span className="font-mono-data text-xs text-[#E2E8F0]">{p}</span>
                    <div className="flex gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-[#FBBF24]" title="Super Admin"></div>
                      {p.includes('.read') || p.includes('.suspend') || p.includes('.resolve') ? (
                        <div className="h-2 w-2 rounded-full bg-[#60A5FA]" title="Moderator"></div>
                      ) : <div className="h-2 w-2 rounded-full bg-[#1E3A5F]"></div>}
                      {p.includes('analytics') ? (
                         <div className="h-2 w-2 rounded-full bg-[#4ADE80]" title="Analyst"></div>
                      ) : <div className="h-2 w-2 rounded-full bg-[#1E3A5F]"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
