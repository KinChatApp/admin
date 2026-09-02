import { X, FileText, Image as ImageIcon, Film, Paperclip, Clock, ShieldAlert, Trash2, Smile, Link2 } from 'lucide-react';
import { useMessageDetails } from '../hooks/useContentData';

export function MessageDetailsDrawer({ messageId, onClose }: { messageId: string | null, onClose: () => void }) {
  const { data, isLoading } = useMessageDetails(messageId);

  if (!messageId) return null;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-[#020914]/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-[#1E3A5F] bg-[#07111F] shadow-2xl transition-transform duration-300 sm:w-[480px]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1E3A5F] px-5 py-4">
          <h2 className="text-lg font-semibold text-[#F8FAFC]">Message Payload</h2>
          <button onClick={onClose} className="rounded p-1 text-[#64748B] hover:bg-[#12243A] hover:text-[#F8FAFC]">
            <X size={20} />
          </button>
        </div>

        {isLoading || !data?.message ? (
          <div className="flex flex-1 items-center justify-center text-sm text-[#64748B]">Loading message details...</div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 quiet-scrollbar">
            
            {/* Core Info */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono-data text-[#64748B] uppercase tracking-wider">Sender</p>
                  <p className="font-medium text-[#F8FAFC]">{data.message.sender?.display_name || 'System / Unknown'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono-data text-[#64748B] uppercase tracking-wider">Timestamp</p>
                  <p className="text-sm text-[#F8FAFC]">{new Date(data.message.created_at).toLocaleString()}</p>
                </div>
              </div>

              {data.message.deleted_at && (
                <div className="flex items-center gap-2 rounded border border-[#991B1B]/50 bg-[#450A0A]/30 p-2.5 text-xs text-[#F87171]">
                  <Trash2 size={14} /> This message was deleted on {new Date(data.message.deleted_at).toLocaleString()}
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="mb-6">
              <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Content</h4>
              <div className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4 text-sm text-[#E2E8F0] whitespace-pre-wrap">
                {data.message.content || <span className="text-[#64748B] italic">No text content</span>}
              </div>
            </div>

            {/* Media & Attachments */}
            {data.attachments.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Paperclip size={14} /> Attachments & Media</h4>
                <div className="space-y-2">
                  {data.attachments.map((file: any) => (
                    <div key={file.id} className="flex items-center justify-between rounded border border-[#1E3A5F] bg-[#0D1B2A] p-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded bg-[#12243A] p-2 text-[#60A5FA]">
                          {file.file_type?.startsWith('image') ? <ImageIcon size={14} /> : 
                           file.file_type?.startsWith('video') ? <Film size={14} /> : <FileText size={14} />}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#F8FAFC] truncate max-w-[200px]">{file.file_name || 'Unnamed file'}</p>
                          <p className="text-[10px] text-[#64748B] uppercase">{file.file_type?.split('/')[1] || 'UNKNOWN'}</p>
                        </div>
                      </div>
                      <span className="font-mono-data text-xs text-[#94A3B8]">{formatBytes(file.file_size)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links & Previews */}
            {data.linkPreviews.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Link2 size={14} /> Extracted Links</h4>
                <div className="space-y-2">
                  {data.linkPreviews.map((link: any) => (
                    <div key={link.id} className="rounded border border-[#1E3A5F] bg-[#0D1B2A] p-3">
                      <p className="text-xs font-medium text-[#60A5FA] truncate">{link.url}</p>
                      {link.title && <p className="text-xs text-[#E2E8F0] mt-1 line-clamp-1">{link.title}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reactions */}
            {data.reactions.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Smile size={14} /> Reactions</h4>
                <div className="flex flex-wrap gap-2">
                  {data.reactions.map((rxn: any) => (
                    <div key={rxn.id} className="flex items-center gap-1.5 rounded-full border border-[#1E3A5F] bg-[#12243A] px-2.5 py-1 text-xs">
                      <span>{rxn.reaction}</span>
                      <span className="text-[#94A3B8]">{rxn.user?.display_name || 'User'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata (JSON) */}
            <div className="mb-6">
              <h4 className="text-xs font-mono-data font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">Metadata (Raw)</h4>
              <div className="rounded-lg border border-[#1E3A5F] bg-[#020914] p-3">
                <pre className="font-mono-data text-[10px] text-[#60A5FA] overflow-x-auto">
                  {JSON.stringify(data.message.metadata || { status: 'none_provided' }, null, 2)}
                </pre>
              </div>
            </div>

            {/* Moderation Actions */}
            <div className="border-t border-[#1E3A5F] pt-4 mt-4">
              <h4 className="text-xs font-mono-data font-semibold text-[#F87171] uppercase tracking-wider mb-3 flex items-center gap-1.5"><ShieldAlert size={14} /> Moderation</h4>
              <div className="flex gap-2">
                <button className="flex-1 rounded border border-[#991B1B] bg-[#450A0A]/50 px-3 py-2 text-xs font-medium text-[#FECACA] hover:bg-[#7F1D1D]">
                  Delete for Everyone
                </button>
                <button className="flex-1 rounded border border-[#1E3A5F] bg-[#0D1B2A] px-3 py-2 text-xs font-medium text-[#F8FAFC] hover:bg-[#12243A]">
                  Flag Content
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
}
