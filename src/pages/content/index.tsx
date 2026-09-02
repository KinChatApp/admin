import { useState } from 'react';
import { Search, Image as ImageIcon, Film, FileText, Database, MessageSquare, Trash2 } from 'lucide-react';
import { TinyLabel } from '@/components/layout/tiny-label';
import { useMessages, useStorageStats } from './hooks/useContentData';
import { MessageDetailsDrawer } from './components/MessageDetailsDrawer';

export default function ContentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  const { data: messages, isLoading } = useMessages(searchQuery, typeFilter);
  const { data: storageStats } = useStorageStats();

  const formatBytes = (bytes: number) => {
    if (!bytes || bytes === 0) return '0 GB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon size={14} />;
      case 'video': return <Film size={14} />;
      case 'document': return <FileText size={14} />;
      default: return <MessageSquare size={14} />;
    }
  };

  return (
    <div className="panel-grid min-h-full">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        
        {/* Header Section */}
        <div className="animate-rise-in mb-8">
          <TinyLabel>Content & Media</TinyLabel>
          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-[32px]">
            Content Infrastructure
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[#94A3B8]">
            Monitor exchanged messages, media attachments, and platform storage usage.
          </p>
        </div>

        {/* Storage Stats Row */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5">
            <div className="flex items-center gap-2 text-[#64748B] mb-2"><Database size={16} /><span className="text-xs font-medium uppercase tracking-wider">Total Storage Used</span></div>
            <p className="text-2xl font-mono-data font-semibold text-[#F8FAFC]">{formatBytes(storageStats?.totalSize || 0)}</p>
          </div>
          <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5">
            <div className="flex items-center gap-2 text-[#60A5FA] mb-2"><ImageIcon size={16} /><span className="text-xs font-medium uppercase tracking-wider">Images & Stickers</span></div>
            <p className="text-2xl font-mono-data font-semibold text-[#60A5FA]">{formatBytes(storageStats?.imageSize || 0)}</p>
          </div>
          <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5">
            <div className="flex items-center gap-2 text-[#8B5CF6] mb-2"><Film size={16} /><span className="text-xs font-medium uppercase tracking-wider">Video Media</span></div>
            <p className="text-2xl font-mono-data font-semibold text-[#8B5CF6]">{formatBytes(storageStats?.videoSize || 0)}</p>
          </div>
          <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5">
            <div className="flex items-center gap-2 text-[#F59E0B] mb-2"><FileText size={16} /><span className="text-xs font-medium uppercase tracking-wider">Documents & Other</span></div>
            <p className="text-2xl font-mono-data font-semibold text-[#F59E0B]">{formatBytes(storageStats?.otherSize || 0)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input 
              type="text" 
              placeholder="Search message content..."
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
              <option value="all">All Content</option>
              <option value="text">Text Messages</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
              <option value="deleted">Deleted Messages</option>
            </select>
          </div>
        </div>

        {/* Messages Table */}
        <div className="overflow-hidden rounded-lg border border-[#1E3A5F] bg-[#0D1B2A]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#1E3A5F] bg-[#07111F] text-xs uppercase text-[#64748B]">
                <tr>
                  <th className="px-5 py-4 font-mono-data font-medium">Type</th>
                  <th className="px-5 py-4 font-mono-data font-medium">Content Snippet</th>
                  <th className="px-5 py-4 font-mono-data font-medium">Sender</th>
                  <th className="px-5 py-4 font-mono-data font-medium">Time</th>
                  <th className="px-5 py-4 font-mono-data font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E3A5F]">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-[#64748B]">Searching content index...</td>
                  </tr>
                ) : messages?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-[#64748B]">No messages match your criteria.</td>
                  </tr>
                ) : (
                  messages?.map((msg) => (
                    <tr key={msg.id} className={`transition-colors hover:bg-[#12243A]/50 ${msg.deleted_at ? 'opacity-60' : ''}`}>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-medium capitalize ${
                          msg.deleted_at ? 'bg-[#450A0A] text-[#F87171]' : 'bg-[#172554] text-[#60A5FA]'
                        }`}>
                          {msg.deleted_at ? <Trash2 size={12} /> : getIconForType(msg.type || 'text')}
                          {msg.deleted_at ? 'Deleted' : msg.type}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <p className="max-w-[300px] truncate text-[#E2E8F0]">
                          {msg.content || <span className="italic text-[#64748B]">[Media/Attachment]</span>}
                        </p>
                      </td>
                      <td className="px-5 py-3">
                        <p className="font-medium text-[#F8FAFC]">{msg.sender?.display_name || 'System'}</p>
                      </td>
                      <td className="px-5 py-3 text-[#94A3B8]">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button 
                          onClick={() => setSelectedMessageId(msg.id)}
                          className="inline-flex h-8 items-center justify-center rounded border border-[#1E3A5F] bg-transparent px-3 text-xs text-[#60A5FA] hover:bg-[#1E3A5F] hover:text-[#F8FAFC]"
                        >
                          Inspect
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

      <MessageDetailsDrawer messageId={selectedMessageId} onClose={() => setSelectedMessageId(null)} />
    </div>
  );
}
