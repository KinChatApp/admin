import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useNotificationLogs(statusFilter: string, searchQuery: string) {
  return useQuery({
    queryKey: ['notification-logs', statusFilter, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('notification_logs')
        .select(`
          id, title, body, status, created_at, error_message,
          user:users!notification_logs_user_id_fkey(id, display_name, avatar_url)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });
}

export function useNotificationDetails(logId: string | null) {
  return useQuery({
    queryKey: ['notification-details', logId],
    queryFn: async () => {
      if (!logId) return null;

      const { data, error } = await supabase
        .from('notification_logs')
        .select(`
          *,
          user:users!notification_logs_user_id_fkey(id, display_name),
          device:user_devices!notification_logs_device_id_fkey(device_type, is_active)
        `)
        .eq('id', logId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!logId,
  });
}

export function useEngagementStats() {
  return useQuery({
    queryKey: ['engagement-stats'],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayIso = today.toISOString();

      const [
        { count: totalSent },
        { count: totalFailed }
      ] = await Promise.all([
        supabase.from('notification_logs').select('*', { count: 'exact', head: true }).gte('created_at', todayIso).eq('status', 'sent'),
        supabase.from('notification_logs').select('*', { count: 'exact', head: true }).gte('created_at', todayIso).eq('status', 'failed')
      ]);

      const sent = totalSent || 0;
      const failed = totalFailed || 0;
      const total = sent + failed;
      const successRate = total > 0 ? Math.round((sent / total) * 100) : 0;

      return { sent, failed, successRate };
    }
  });
}
