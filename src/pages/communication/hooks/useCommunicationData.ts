import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useChats(searchQuery: string, typeFilter: string) {
  return useQuery({
    queryKey: ['chats-list', searchQuery, typeFilter],
    queryFn: async () => {
      let query = supabase
        .from('chats')
        .select(`
          id, title, is_group, created_at, updated_at,
          participants:chat_participants(
            user:users(id, display_name, avatar_url)
          )
        `)
        .order('updated_at', { ascending: false })
        .limit(50);

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }
      if (typeFilter === 'private') {
        query = query.is('is_group', false);
      } else if (typeFilter === 'group') {
        query = query.is('is_group', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });
}

export function useChatDetails(chatId: string | null) {
  return useQuery({
    queryKey: ['chat-details', chatId],
    queryFn: async () => {
      if (!chatId) return null;

      const [chatRes, participantsRes, statsRes] = await Promise.all([
        supabase.from('chats').select('*').eq('id', chatId).single(),
        supabase.from('chat_participants').select('*, user:users(id, display_name, phone)').eq('chat_id', chatId),
        supabase.from('chat_user_statistics').select('*').eq('chat_id', chatId)
      ]);

      return {
        chat: chatRes.data,
        participants: participantsRes.data || [],
        stats: statsRes.data || []
      };
    },
    enabled: !!chatId,
  });
}
