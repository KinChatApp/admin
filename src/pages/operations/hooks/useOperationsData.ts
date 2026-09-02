import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useSystemHealth() {
  return useQuery({
    queryKey: ['system-health'],
    queryFn: async () => {
      const startTime = performance.now();
      let dbStatus = 'operational';
      let dbLatency = 0;

      try {
        // Actual ping to database to check health[span_0](start_span)[span_0](end_span)
        await supabase.from('users').select('id').limit(1);
        dbLatency = Math.round(performance.now() - startTime);
      } catch (error) {
        dbStatus = 'degraded';
      }

      // Simulating external APM telemetry data for the dashboard
      return {
        database: { status: dbStatus, latency: `${dbLatency}ms`, uptime: '99.99%' },
        api: { status: 'operational', latency: '42ms', errorRate: '0.01%', requests: '1.2k/min' },
        realtime: { status: 'operational', connections: 2450, failures: 3, uptime: '99.95%' },
        storage: { status: 'operational', latency: '125ms', usage: '68%' },
        notifications: { status: 'operational', fcmDeliveryRate: '99.8%', failedQueue: 12 },
        workers: { status: 'operational', running: 4, queued: 18, failed: 1 },
      };
    },
    refetchInterval: 15000, // Refresh every 15 seconds
  });
}

export function useSystemLogs() {
  return useQuery({
    queryKey: ['system-logs'],
    queryFn: async () => {
      // Simulating system logs (In production, fetch from Datadog/CloudWatch or a logs table)
      return [
        { id: 1, type: 'error', message: 'FCM push delivery failed for user_id: a1b2c3d4', source: 'notification-worker', timestamp: new Date(Date.now() - 120000).toISOString() },
        { id: 2, type: 'warning', message: 'High memory usage detected on WebRTC signaling node', source: 'realtime-cluster', timestamp: new Date(Date.now() - 360000).toISOString() },
        { id: 3, type: 'info', message: 'Database daily backup completed successfully', source: 'pg-cron', timestamp: new Date(Date.now() - 7200000).toISOString() },
        { id: 4, type: 'info', message: 'Storage bucket cache cleared', source: 'storage-api', timestamp: new Date(Date.now() - 8600000).toISOString() },
        { id: 5, type: 'warning', message: 'Rate limit threshold reached for API /v1/messages', source: 'api-gateway', timestamp: new Date(Date.now() - 12000000).toISOString() },
      ];
    },
    refetchInterval: 10000,
  });
}

export function useIncidents() {
  return useQuery({
    queryKey: ['system-incidents'],
    queryFn: async () => {
      return [
        { id: 'INC-042', title: 'Delayed message delivery in Asia region', status: 'resolved', severity: 'minor', created_at: new Date(Date.now() - 86400000).toISOString(), resolved_at: new Date(Date.now() - 80000000).toISOString() },
        { id: 'INC-041', title: 'Storage API returning 502 Bad Gateway', status: 'resolved', severity: 'major', created_at: new Date(Date.now() - 259200000).toISOString(), resolved_at: new Date(Date.now() - 252000000).toISOString() },
      ];
    }
  });
}
