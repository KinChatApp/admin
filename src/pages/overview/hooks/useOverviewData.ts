import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function usePlatformSnapshot() {
  return useQuery({
    queryKey: ['platform-snapshot'],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayIso = today.toISOString();

      const [
        { count: totalUsers },
        { count: onlineUsers },
        { count: newUsers },
        { count: messagesToday },
        { count: callsToday },
        { count: pendingReports }
      ] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('users').select('*', { count: 'exact', head: true }).eq('is_online', true),
        supabase.from('users').select('*', { count: 'exact', head: true }).gte('created_at', todayIso),
        supabase.from('messages').select('*', { count: 'exact', head: true }).gte('created_at', todayIso),
        supabase.from('calls').select('*', { count: 'exact', head: true }).gte('created_at', todayIso),
        supabase.from('reports').select('*', { count: 'exact', head: true }).eq('status', 'pending')
      ]);

      return {
        totalUsers: totalUsers || 0,
        onlineUsers: onlineUsers || 0,
        newUsers: newUsers || 0,
        messagesToday: messagesToday || 0,
        callsToday: callsToday || 0,
        pendingReports: pendingReports || 0,
      };
    },
    refetchInterval: 60000,
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('audit_logs')
        .select(`
          id, action, created_at, target_type,
          users:actor_id (display_name)
        `)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      return data || [];
    }
  });
}

export function useChartData() {
  return useQuery({
    queryKey: ['overview-charts'],
    queryFn: async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      sevenDaysAgo.setHours(0, 0, 0, 0);
      const isoString = sevenDaysAgo.toISOString();

      const [usersRes, msgsRes, callsRes] = await Promise.all([
        supabase.from('users').select('created_at').gte('created_at', isoString),
        supabase.from('messages').select('created_at').gte('created_at', isoString),
        supabase.from('calls').select('created_at').gte('created_at', isoString)
      ]);

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
      });

      return last7Days.map(date => {
        const dayLabel = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
        return {
          name: dayLabel,
          users: usersRes.data?.filter(u => u.created_at?.startsWith(date)).length || 0,
          messages: msgsRes.data?.filter(m => m.created_at?.startsWith(date)).length || 0,
          calls: callsRes.data?.filter(c => c.created_at?.startsWith(date)).length || 0,
        };
      });
    }
  });
}
