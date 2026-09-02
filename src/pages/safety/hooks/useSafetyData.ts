import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useReports(statusFilter: string, typeFilter: string) {
  return useQuery({
    queryKey: ['reports-list', statusFilter, typeFilter],
    queryFn: async () => {
      let query = supabase
        .from('reports')
        .select(`
          id, reason, status, target_type, created_at,
          reporter:users!reports_reporter_id_fkey(id, display_name),
          reported_user:users!reports_reported_user_id_fkey(id, display_name)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (typeFilter && typeFilter !== 'all') {
        query = query.eq('target_type', typeFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });
}

export function useReportDetails(reportId: string | null) {
  return useQuery({
    queryKey: ['report-details', reportId],
    queryFn: async () => {
      if (!reportId) return null;

      const { data, error } = await supabase
        .from('reports')
        .select(`
          *,
          reporter:users!reports_reporter_id_fkey(id, display_name, avatar_url, status),
          reported_user:users!reports_reported_user_id_fkey(id, display_name, avatar_url, status),
          message:messages!reports_reported_message_id_fkey(id, content, type, deleted_at)
        `)
        .eq('id', reportId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!reportId,
  });
}

export function useSafetySummary() {
  return useQuery({
    queryKey: ['safety-summary'],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayIso = today.toISOString();

      const [
        { count: pendingCount },
        { count: resolvedTodayCount }
      ] = await Promise.all([
        supabase.from('reports').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('reports').select('*', { count: 'exact', head: true }).in('status', ['resolved', 'dismissed']).gte('reviewed_at', todayIso)
      ]);

      return {
        pendingCount: pendingCount || 0,
        resolvedTodayCount: resolvedTodayCount || 0
      };
    },
    refetchInterval: 30000 // 30s auto refresh for moderation queue
  });
}
