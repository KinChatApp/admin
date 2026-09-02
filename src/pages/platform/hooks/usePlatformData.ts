import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Fetching real data from the app_versions table
export function useAppVersions() {
  return useQuery({
    queryKey: ['app-versions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('app_versions')
        .select('*')
        .order('released_at', { ascending: false });

      if (error) throw error;
      return data || [];
    }
  });
}

// Simulated Feature Flags (Since platform settings usually reside in a config file, Redis, or a separate kv-store)
export const initialFeatureFlags = [
  { id: 'channels', name: 'Channels', category: 'Communication', status: 'ON', description: 'Enable one-to-many broadcast channels.' },
  { id: 'communities', name: 'Communities', category: 'Communication', status: 'OFF', description: 'Enable nested subgroups and large communities.' },
  { id: 'ai_assistant', name: 'AI Assistant', category: 'Smart Features', status: 'BETA', description: 'Enable AI chat assistant for users.' },
  { id: 'stories', name: 'Stories / Status', category: 'Content', status: 'ON', description: 'Enable 24-hour disappearing status updates.' },
  { id: 'group_calls', name: 'Group Calls', category: 'Calls', status: 'OFF', description: 'Enable multi-participant audio/video calls.' },
];
