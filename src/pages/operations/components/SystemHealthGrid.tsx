import { Database, Server, Radio, HardDrive, Bell, Cpu, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import { useSystemHealth } from '../hooks/useOperationsData';

export function SystemHealthGrid() {
  const { data: health, isLoading } = useSystemHealth();

  if (isLoading || !health) {
    return <div className="h-40 animate-pulse rounded-lg bg-[#0D1B2A] border border-[#1E3A5F]"></div>;
  }

  const getStatusIcon = (status: string) => {
    if (status === 'operational') return <CheckCircle2 size={16} className="text-[#4ADE80]" />;
    if (status === 'degraded') return <AlertTriangle size={16} className="text-[#FBBF24]" />;
    return <AlertOctagon size={16} className="text-[#F87171]" />;
  };

  const cards = [
    { title: 'Database (PostgreSQL)', icon: Database, data: health.database, metrics: [{ label: 'Latency', val: health.database.latency }, { label: 'Uptime', val: health.database.uptime }] },
    { title: 'API Gateway', icon: Server, data: health.api, metrics: [{ label: 'Latency', val: health.api.latency }, { label: 'Error Rate', val: health.api.errorRate }, { label: 'Load', val: health.api.requests }] },
    { title: 'Realtime WebSocket', icon: Radio, data: health.realtime, metrics: [{ label: 'Active Conns', val: health.realtime.connections }, { label: 'Failures', val: health.realtime.failures }] },
    { title: 'Object Storage', icon: HardDrive, data: health.storage, metrics: [{ label: 'Latency', val: health.storage.latency }, { label: 'Capacity', val: health.storage.usage }] },
    { title: 'Notification Engine (FCM)', icon: Bell, data: health.notifications, metrics: [{ label: 'Delivery Rate', val: health.notifications.fcmDeliveryRate }, { label: 'Failed Queue', val: health.notifications.failedQueue }] },
    { title: 'Background Workers', icon: Cpu, data: health.workers, metrics: [{ label: 'Running Jobs', val: health.workers.running }, { label: 'Queued', val: health.workers.queued }, { label: 'Failed', val: health.workers.failed }] },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const isError = card.data.status !== 'operational';
        return (
          <div key={idx} className={`rounded-lg border p-5 ${isError ? 'border-[#450A0A] bg-[#2A0808]/40' : 'border-[#1E3A5F] bg-[#0D1B2A]'}`}>
            <div className="flex items-center justify-between mb-4 border-b border-[#1E3A5F]/50 pb-3">
              <div className="flex items-center gap-2 text-[#E2E8F0]">
                <Icon size={18} className={isError ? 'text-[#F87171]' : 'text-[#60A5FA]'} />
                <span className="font-semibold">{card.title}</span>
              </div>
              {getStatusIcon(card.data.status)}
            </div>
            <div className="flex gap-4">
              {card.metrics.map((m, i) => (
                <div key={i} className="flex-1">
                  <p className="text-[10px] font-mono-data uppercase tracking-wider text-[#64748B] mb-1">{m.label}</p>
                  <p className={`font-mono-data text-sm ${isError ? 'text-[#FCA5A5]' : 'text-[#F8FAFC]'}`}>{m.val}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
