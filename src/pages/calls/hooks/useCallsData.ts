import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useCalls(typeFilter: string, statusFilter: string) {
  return useQuery({
    queryKey: ['calls-list', typeFilter, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('calls')
        .select(`
          *,
          caller:users!calls_caller_id_fkey(id, display_name, avatar_url),
          receiver:users!calls_receiver_id_fkey(id, display_name, avatar_url)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (typeFilter && typeFilter !== 'all') {
        query = query.eq('call_type', typeFilter);
      }
      
      if (statusFilter && statusFilter !== 'all') {
        if (statusFilter === 'active') {
          query = query.in('status', ['ringing', 'answered']);
        } else if (statusFilter === 'failed') {
          query = query.in('status', ['missed', 'rejected', 'failed', 'cancelled']);
        } else {
          query = query.eq('status', statusFilter);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });
}

export function useCallSummary() {
  return useQuery({
    queryKey: ['calls-summary'],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayIso = today.toISOString();

      const [
        { count: totalToday },
        { count: activeNow },
        { count: failedToday }
      ] = await Promise.all([
        supabase.from('calls').select('*', { count: 'exact', head: true }).gte('created_at', todayIso),
        supabase.from('calls').select('*', { count: 'exact', head: true }).in('status', ['ringing', 'answered']),
        supabase.from('calls').select('*', { count: 'exact', head: true }).gte('created_at', todayIso).in('status', ['missed', 'failed', 'rejected', 'cancelled'])
      ]);

      return {
        totalToday: totalToday || 0,
        activeNow: activeNow || 0,
        failedToday: failedToday || 0
      };
    },
    refetchInterval: 30000 // Refresh every 30s for live feel
  });
}
