import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useMessages(searchQuery: string, typeFilter: string) {
  return useQuery({
    queryKey: ['messages-list', searchQuery, typeFilter],
    queryFn: async () => {
      let query = supabase
        .from('messages')
        .select(`
          *,
          sender:users!messages_sender_id_fkey(id, display_name, avatar_url)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (searchQuery) {
        query = query.ilike('content', `%${searchQuery}%`);
      }
      if (typeFilter && typeFilter !== 'all') {
        if (typeFilter === 'deleted') {
          query = query.not('deleted_at', 'is', null);
        } else {
          query = query.eq('type', typeFilter).is('deleted_at', null);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });
}

export function useMessageDetails(messageId: string | null) {
  return useQuery({
    queryKey: ['message-details', messageId],
    queryFn: async () => {
      if (!messageId) return null;

      const [msgRes, attRes, rxnRes, previewRes] = await Promise.all([
        supabase.from('messages').select('*, sender:users!messages_sender_id_fkey(display_name)').eq('id', messageId).single(),
        supabase.from('attachments').select('*').eq('message_id', messageId),
        supabase.from('message_reactions').select('*, user:users!message_reactions_user_id_fkey(display_name)').eq('message_id', messageId),
        supabase.from('link_previews').select('*').eq('message_id', messageId)
      ]);

      return {
        message: msgRes.data,
        attachments: attRes.data || [],
        reactions: rxnRes.data || [],
        linkPreviews: previewRes.data || []
      };
    },
    enabled: !!messageId,
  });
}

export function useStorageStats() {
  return useQuery({
    queryKey: ['storage-stats'],
    queryFn: async () => {
      // In a real app, this would be an RPC call for performance.
      // Fetching sample of attachments to generate mock stats for the UI
      const { data } = await supabase.from('attachments').select('file_size, file_type').limit(1000);
      
      let totalSize = 0;
      let imageSize = 0;
      let videoSize = 0;
      let otherSize = 0;

      data?.forEach(file => {
        const size = file.file_size || 0;
        totalSize += size;
        if (file.file_type?.startsWith('image')) imageSize += size;
        else if (file.file_type?.startsWith('video')) videoSize += size;
        else otherSize += size;
      });

      // Multiplying by a factor to simulate realistic platform storage based on sample
      const multiplier = 5000; 
      
      return {
        totalSize: totalSize * multiplier,
        imageSize: imageSize * multiplier,
        videoSize: videoSize * multiplier,
        otherSize: otherSize * multiplier,
        fileCount: (data?.length || 0) * multiplier
      };
    }
  });
}
