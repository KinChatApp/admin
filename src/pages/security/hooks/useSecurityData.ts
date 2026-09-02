import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useAdmins() {
  return useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      // Fetch users who have admin or moderator roles[span_4](start_span)[span_4](end_span)[span_5](start_span)[span_5](end_span)
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .in('role', ['admin', 'moderator'])
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    }
  });
}

export function useAuditLogs(searchQuery: string) {
  return useQuery({
    queryKey: ['audit-logs', searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('audit_logs')
        .select(`
          id, action, target_type, target_id, created_at, metadata,
          actor:users!audit_logs_actor_id_fkey(id, display_name, avatar_url, role)
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (searchQuery) {
        query = query.ilike('action', `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });
}
