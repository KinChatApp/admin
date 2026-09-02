import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useGlobalMetrics() {
  return useQuery({
    queryKey: ['analytics', 'global'],
    queryFn: async () => {
      // Live overview metrics-এর জন্য RPC ঠিক আছে
      const { data, error } = await supabase.rpc('admin_get_global_metrics');
      if (error) throw error;
      return data;
    },
    refetchInterval: 60000,
  });
}

export function useTabMetrics(tab: string) {
  return useQuery({
    queryKey: ['analytics', 'tab', tab],
    queryFn: async () => {
      if (tab === 'retention') {
        const { data, error } = await supabase.rpc('admin_get_retention_metrics');
        if (error) throw error;
        return { kpis: {}, chartData: data };
      }

      if (tab === 'performance') {
        const { data, error } = await supabase.rpc('admin_get_tab_metrics', { p_tab: 'performance' });
        if (error) throw error;
        return data;
      }

      // নতুন স্কিমার `daily_platform_stats` টেবিল থেকে সরাসরি ডেটা ফেচিং
      const startIso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const { data: stats, error } = await supabase
        .from('daily_platform_stats')
        .select('*')
        .gte('stat_date', startIso)
        .order('stat_date', { ascending: true });

      if (error) throw error;
      const validStats = stats || [];

      let kpis: any = {};
      let chartData: any[] = [];

      if (tab === 'users') {
        const totalNew = validStats.reduce((acc, row) => acc + (row.new_users || 0), 0);
        const avgDau = Math.round(validStats.reduce((acc, row) => acc + (row.dau || 0), 0) / (validStats.length || 1));
        kpis = { title1: 'New Users (7D)', val1: totalNew, title2: 'Avg DAU (7D)', val2: avgDau };
        
        chartData = validStats.map(row => ({
          date: new Date(row.stat_date).toLocaleDateString(undefined, { weekday: 'short' }),
          newUsers: row.new_users,
          active: row.dau
        }));
      } 
      else if (tab === 'messaging') {
        const totalMsgs = validStats.reduce((acc, row) => acc + (row.total_messages_sent || 0), 0);
        const avgActiveChats = Math.round(validStats.reduce((acc, row) => acc + (row.active_chats || 0), 0) / (validStats.length || 1));
        kpis = { title1: 'Total Msgs (7D)', val1: totalMsgs.toLocaleString(), title2: 'Avg Active Chats', val2: avgActiveChats };
        
        chartData = validStats.map(row => ({
          date: new Date(row.stat_date).toLocaleDateString(undefined, { weekday: 'short' }),
          messages: row.total_messages_sent
        }));
      }
      else if (tab === 'calls') {
        const totalCalls = validStats.reduce((acc, row) => acc + (row.total_calls || 0), 0);
        const totalFailed = validStats.reduce((acc, row) => acc + (row.failed_calls || 0), 0);
        const successRate = totalCalls > 0 ? Math.round(((totalCalls - totalFailed) / totalCalls) * 100) : 0;
        const avgDur = validStats.reduce((acc, row) => acc + (row.avg_call_duration_sec || 0), 0) / (validStats.length || 1);
        
        kpis = { 
          title1: 'Total Calls (7D)', val1: totalCalls, 
          title2: 'Success Rate', val2: `${successRate}%`,
          title3: 'Avg Duration', val3: `${Math.floor(avgDur / 60)}m ${Math.floor(avgDur % 60)}s`
        };
        
        chartData = validStats.map(row => ({
          date: new Date(row.stat_date).toLocaleDateString(undefined, { weekday: 'short' }),
          success: row.total_calls - row.failed_calls,
          failed: row.failed_calls
        }));
      }
      else if (tab === 'content') {
        const totalBytes = validStats.reduce((acc, row) => acc + (row.storage_bytes_added || 0), 0);
        kpis = { title1: 'Storage Added (7D)', val1: `${(totalBytes / (1024**3)).toFixed(2)} GB` };
        
        chartData = validStats.map(row => ({
          date: new Date(row.stat_date).toLocaleDateString(undefined, { weekday: 'short' }),
          uploads: Number((row.storage_bytes_added / (1024**3)).toFixed(4))
        }));
      }

      return { kpis, chartData };
    }
  });
}
