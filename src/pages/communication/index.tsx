import { useState } from 'react';
import { Search, Users, MessageSquare, Radio, Megaphone, Hash, PlaySquare } from 'lucide-react';
import { TinyLabel } from '@/components/layout/tiny-label';
import { useChats } from './hooks/useCommunicationData';
import { ChatDetailsDrawer } from './components/ChatDetailsDrawer';

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState<'chats' | 'channels' | 'communities' | 'stories' | 'broadcasts'>('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const { data: chats, isLoading } = useChats(searchQuery, typeFilter);

  const tabs = [
    { id: 'chats', label: 'Chats & Groups', icon: MessageSquare },
    { id: 'channels', label: 'Channels', icon: Megaphone },
    { id: 'communities', label: 'Communities', icon: Hash },
    { id: 'stories', label: 'Stories / Status', icon: PlaySquare },
    { id: 'broadcasts', label: 'Broadcasts', icon: Radio },
  ] as const;

  return (
    <div className="panel-grid min-h-full">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        
        {/* Header Section */}
        <div className="animate-rise-in mb-8">
          <TinyLabel>Communication Domain</TinyLabel>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-[32px]">
            Communication Hub
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[#94A3B8]">
            Manage where communication happens: Private chats, Groups, and future broadcasting channels.
          </p>
        </div>

        {/* Domain Navigation Tabs */}
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
                {tab.id !== 'chats' && <span className="ml-1.5 rounded bg-[#12243A] px-1.5 py-0.5 text-[9px] text-[#60A5FA]">Future</span>}
              </button>
            );
          })}
        </div>

        {/* Active Tab Content */}
        {activeTab === 'chats' ? (
          <div className="animate-rise-in">
            {/* Filters */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                <input 
                  type="text" 
                  placeholder="Search group names..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-md border border-[#1E3A5F] bg-[#0D1B2A] pl-9 pr-4 text-sm text-[#F8FAFC] outline-none transition-colors focus:border-[#2563EB]"
                />
              </div>
              <div className="flex gap-2">
                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="h-10 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-3 text-sm text-[#F8FAFC] outline-none focus:border-[#2563EB]"
                >
                  <option value="all">All Conversations</option>
                  <option value="private">Private Chats</option>
                  <option value="group">Group Chats</option>
                </select>
              </div>
            </div>

            {/* Chats Table */}
            <div className="overflow-hidden rounded-lg border border-[#1E3A5F] bg-[#0D1B2A]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-[#1E3A5F] bg-[#07111F] text-xs uppercase text-[#64748B]">
                    <tr>
                      <th className="px-5 py-4 font-mono-data font-medium">Type</th>
                      <th className="px-5 py-4 font-mono-data font-medium">Conversation Info</th>
                      <th className="px-5 py-4 font-mono-data font-medium">Participants</th>
                      <th className="px-5 py-4 font-mono-data font-medium">Last Active</th>
                      <th className="px-5 py-4 font-mono-data font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E3A5F]">
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-8 text-center text-[#64748B]">Loading communication domains...</td>
                      </tr>
                    ) : chats?.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-8 text-center text-[#64748B]">No conversations found.</td>
                      </tr>
                    ) : (
                      chats?.map((chat) => (
                        <tr key={chat.id} className="transition-colors hover:bg-[#12243A]/50">
                          <td className="px-5 py-3">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-medium ${
                              chat.is_group ? 'bg-[#2E1065] text-[#A78BFA]' : 'bg-[#172554] text-[#60A5FA]'
                            }`}>
                              {chat.is_group ? <Users size={12} /> : <MessageSquare size={12} />}
                              {chat.is_group ? 'Group' : 'Private'}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <p className="font-medium text-[#F8FAFC]">
                              {chat.title || (chat.is_group ? 'Unnamed Group' : 'Private Chat')}
                            </p>
                            <p className="text-[10px] text-[#64748B] font-mono-data mt-0.5">{chat.id.substring(0, 13)}...</p>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex -space-x-2">
                              {chat.participants?.slice(0, 3).map((p: any, i: number) => (
                                <div key={i} className="grid h-6 w-6 place-items-center rounded-full border border-[#0D1B2A] bg-[#1D4ED8] text-[9px] text-white">
                                  {p.user?.display_name?.charAt(0) || 'U'}
                                </div>
                              ))}
                              {chat.participants?.length > 3 && (
                                <div className="grid h-6 w-6 place-items-center rounded-full border border-[#0D1B2A] bg-[#1E3A5F] text-[9px] text-white">
                                  +{chat.participants.length - 3}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-3 text-[#94A3B8]">
                            {new Date(chat.updated_at).toLocaleDateString()}
                          </td>
                          <td className="px-5 py-3 text-right">
                            <button 
                              onClick={() => setSelectedChatId(chat.id)}
                              className="inline-flex h-8 items-center justify-center rounded border border-[#1E3A5F] bg-transparent px-3 text-xs text-[#60A5FA] hover:bg-[#1E3A5F] hover:text-[#F8FAFC]"
                            >
                              Details
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
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-[#1E3A5F] border-dashed bg-[#0D1B2A]/50 px-4 text-center">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-[#12243A] text-[#64748B]">
              {activeTab === 'channels' && <Megaphone size={24} />}
              {activeTab === 'communities' && <Hash size={24} />}
              {activeTab === 'stories' && <PlaySquare size={24} />}
              {activeTab === 'broadcasts' && <Radio size={24} />}
            </div>
            <h3 className="text-sm font-medium text-[#E2E8F0] capitalize">{activeTab} Infrastructure</h3>
            <p className="mt-1 max-w-sm text-xs text-[#64748B]">
              The core foundation for {activeTab} is mapped in the architecture. Administrative interfaces will be unlocked here in a future update.
            </p>
          </div>
        )}
      </div>

      <ChatDetailsDrawer chatId={selectedChatId} onClose={() => setSelectedChatId(null)} />
    </div>
  );
}
