import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useUsers(searchQuery: string, statusFilter: string) {
  return useQuery({
    queryKey: ['users-list', searchQuery, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('display_name', `%${searchQuery}%`);
      }
      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });
}

export function useUserDetails(userId: string | null) {
  return useQuery({
    queryKey: ['user-details', userId],
    queryFn: async () => {
      if (!userId) return null;

      const [userRes, statsRes, devicesRes] = await Promise.all([
        supabase.from('users').select('*').eq('id', userId).single(),
        supabase.from('user_global_statistics').select('*').eq('user_id', userId).single(),
        supabase.from('user_devices').select('*').eq('user_id', userId).order('updated_at', { ascending: false })
      ]);

      return {
        profile: userRes.data,
        stats: statsRes.data,
        devices: devicesRes.data || []
      };
    },
    enabled: !!userId,
  });
}
