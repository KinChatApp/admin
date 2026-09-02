import { MessageSquare, PhoneCall, ShieldAlert, UserPlus, Users, Radio } from 'lucide-react';
import { StatCard, type Stat } from './StatCard';
import { usePlatformSnapshot } from '../hooks/useOverviewData';

export function PlatformSnapshot() {
  const { data, isLoading, isError } = usePlatformSnapshot();

  if (isLoading) return <div className="h-32 animate-pulse rounded-lg bg-[#12243A]"></div>;
  if (isError || !data) return <div className="text-red-400">Failed to load platform data.</div>;

  const stats: Stat[] = [
    { label: 'Total Users', value: data.totalUsers, delta: 'Total', detail: 'registered accounts', icon: Users, tone: 'blue' },
    { label: 'Online Now', value: data.onlineUsers, delta: 'Live', detail: 'currently active', icon: Radio, tone: 'green' },
    { label: 'New Users', value: data.newUsers, delta: 'Today', detail: 'joined since midnight', icon: UserPlus, tone: 'green' },
    { label: 'Messages Today', value: data.messagesToday, delta: 'Today', detail: 'messages sent', icon: MessageSquare, tone: 'blue' },
    { label: 'Calls Today', value: data.callsToday, delta: 'Today', detail: 'audio & video sessions', icon: PhoneCall, tone: 'blue' },
    { label: 'Pending Reports', value: data.pendingReports, delta: 'Action Needed', detail: 'awaiting moderation', icon: ShieldAlert, tone: 'amber' },
  ];

  return (
    <section aria-labelledby="snapshot-heading">
      <div className="sr-only" id="snapshot-heading">Platform snapshot</div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </div>
    </section>
  );
}
