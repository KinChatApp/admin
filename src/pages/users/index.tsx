import { useState } from 'react';
import { Search, Filter, ShieldCheck, MoreVertical } from 'lucide-react';
import { TinyLabel } from '@/components/layout/tiny-label';
import { useUsers } from './hooks/useUsersData';
import { UserProfileDrawer } from './components/UserProfileDrawer';

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { data: users, isLoading } = useUsers(searchQuery, statusFilter);

  return (
    <div className="panel-grid min-h-full">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        
        {/* Header Section */}
        <div className="animate-rise-in mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <TinyLabel>Identity & Users</TinyLabel>
            <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-[32px]">
              User Directory
            </h1>
            <p className="mt-2 max-w-xl text-sm text-[#94A3B8]">
              Manage accounts, verify identities, and monitor user sessions.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input 
              type="text" 
              placeholder="Search users by name..."
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
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="deleted">Deleted</option>
            </select>
            <button className="flex h-10 items-center gap-2 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-3 text-sm text-[#64748B] hover:text-[#F8FAFC]">
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-lg border border-[#1E3A5F] bg-[#0D1B2A]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#1E3A5F] bg-[#07111F] text-xs uppercase text-[#64748B]">
                <tr>
                  <th className="px-5 py-4 font-mono-data font-medium">User</th>
                  <th className="px-5 py-4 font-mono-data font-medium">Contact</th>
                  <th className="px-5 py-4 font-mono-data font-medium">Status</th>
                  <th className="px-5 py-4 font-mono-data font-medium">Joined</th>
                  <th className="px-5 py-4 font-mono-data font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E3A5F]">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-[#64748B]">Loading users...</td>
                  </tr>
                ) : users?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-[#64748B]">No users found matching criteria.</td>
                  </tr>
                ) : (
                  users?.map((user) => (
                    <tr key={user.id} className="transition-colors hover:bg-[#12243A]/50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1D4ED8] text-xs font-bold text-white">
                            {user.display_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="font-medium text-[#F8FAFC]">{user.display_name}</p>
                              {user.is_verified && <ShieldCheck size={14} className="text-[#4ADE80]" />}
                            </div>
                            <p className="text-[11px] text-[#64748B]">ID: {user.id.substring(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-[#E2E8F0]">{user.phone || 'No phone'}</p>
                        <p className="text-[11px] text-[#64748B]">{user.email || 'No email'}</p>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          user.status === 'active' ? 'bg-[#052E1A] text-[#4ADE80]' : 
                          user.status === 'suspended' ? 'bg-[#422006] text-[#FBBF24]' : 'bg-[#450A0A] text-[#F87171]'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[#94A3B8]">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button 
                          onClick={() => setSelectedUserId(user.id)}
                          className="inline-flex h-8 items-center justify-center rounded border border-[#1E3A5F] bg-transparent px-3 text-xs text-[#60A5FA] hover:bg-[#1E3A5F] hover:text-[#F8FAFC]"
                        >
                          Manage
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

      {/* User Profile Slide-over */}
      <UserProfileDrawer 
        userId={selectedUserId} 
        onClose={() => setSelectedUserId(null)} 
      />
    </div>
  );
}
