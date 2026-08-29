import { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  MessageSquare,
  MoreHorizontal,
  Radio,
  RefreshCw,
  Server,
  ShieldAlert,
  Users,
  UserPlus,
  Video,
} from 'lucide-react';
import { Link } from 'wouter';
import { TinyLabel } from '@/components/layout/tiny-label';

type Stat = { label: string; value: string; delta: string; detail: string; icon: typeof Users; tone: 'blue' | 'green' | 'amber' };

const stats: Stat[] = [
  { label: 'Total Users', value: '2,418,639', delta: '+4.8%', detail: 'vs. previous 30 days', icon: Users, tone: 'blue' },
  { label: 'Active Users', value: '684,219', delta: '+2.1%', detail: 'in the last 28 days', icon: Radio, tone: 'green' },
  { label: 'Messages Today', value: '8,492,107', delta: '+7.4%', detail: 'compared to yesterday', icon: MessageSquare, tone: 'blue' },
  { label: 'Online Users', value: '126,847', delta: 'live', detail: 'currently online', icon: Radio, tone: 'green' },
  { label: 'Pending Reports', value: '184', delta: '12 urgent', detail: 'awaiting review', icon: ShieldAlert, tone: 'amber' },
];

const activity = [
  { icon: UserPlus, title: 'New user milestone reached', detail: '2.4M registered accounts', time: '18 min ago', color: 'text-[#60A5FA]' },
  { icon: ShieldAlert, title: 'Report queue threshold crossed', detail: 'Trust & Safety queue · 184 open', time: '42 min ago', color: 'text-[#FBBF24]' },
  { icon: Video, title: 'Call quality report available', detail: 'Weekly quality digest generated', time: '1 hr ago', color: 'text-[#A78BFA]' },
  { icon: Server, title: 'Platform maintenance completed', detail: 'us-east-1 · no downtime recorded', time: '3 hrs ago', color: 'text-[#4ADE80]' },
];

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;
  const iconClass = stat.tone === 'amber' ? 'bg-[#422006] text-[#FBBF24]' : stat.tone === 'green' ? 'bg-[#052E1A] text-[#4ADE80]' : 'bg-[#172554] text-[#60A5FA]';
  return (
    <div className="group rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4 transition-colors hover:border-[#2B5689] sm:p-5" data-testid={`card-stat-${stat.label.toLowerCase().replaceAll(' ', '-')}`}>
      <div className="flex items-start justify-between gap-3"><div className={`grid h-8 w-8 place-items-center rounded-md ${iconClass}`}><Icon size={16} /></div><button type="button" className="grid h-7 w-7 place-items-center rounded text-[#64748B] opacity-0 transition-opacity hover:bg-[#12243A] hover:text-[#F8FAFC] group-hover:opacity-100" aria-label={`More options for ${stat.label}`} data-testid={`button-stat-options-${stat.label.toLowerCase().replaceAll(' ', '-')}`}><MoreHorizontal size={16} /></button></div>
      <p className="mt-5 text-[11px] text-[#94A3B8]">{stat.label}</p>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1"><p className="font-mono-data text-[22px] font-medium tracking-[-0.04em] text-[#F8FAFC] sm:text-[24px]" data-testid={`value-stat-${stat.label.toLowerCase().replaceAll(' ', '-')}`}>{stat.value}</p><span className={`font-mono-data text-[10px] ${stat.tone === 'amber' ? 'text-[#FBBF24]' : 'text-[#4ADE80]'}`}>{stat.delta}</span></div>
      <p className="mt-1 text-[10px] text-[#64748B]">{stat.detail}</p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: string }) {
  return <div className="mb-4 flex items-end justify-between gap-4"><div><TinyLabel>{eyebrow}</TinyLabel><h2 className="mt-1 text-[17px] font-semibold tracking-[-0.02em] text-[#F8FAFC]">{title}</h2></div>{action && <button type="button" className="text-xs text-[#60A5FA] hover:text-[#93C5FD]" data-testid={`button-${action.toLowerCase().replaceAll(' ', '-')}`}>{action}<ArrowUpRight size={13} className="ml-1 inline" /></button>}</div>;
}

export default function Overview() {
  const [lastUpdated, setLastUpdated] = useState('just now');
  return (
    <div className="panel-grid min-h-full">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <div className="animate-rise-in mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><TinyLabel>System overview · {lastUpdated}</TinyLabel><h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-[32px]">Good morning, Maya.</h1><p className="mt-2 max-w-xl text-sm text-[#94A3B8]">A quiet view of KinChat’s people, conversations, and platform health.</p></div>
          <button type="button" onClick={() => setLastUpdated('just now')} className="flex w-fit items-center gap-2 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-3 py-2 text-xs text-[#94A3B8] transition-colors hover:border-[#2563EB] hover:text-[#F8FAFC]" data-testid="button-refresh-overview"><RefreshCw size={14} />Refresh data</button>
        </div>
        <section aria-labelledby="snapshot-heading"><div className="sr-only" id="snapshot-heading">Platform snapshot</div><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</div></section>
        <div className="mt-8 grid gap-5 xl:grid-cols-[1.35fr_1fr]">
          <section className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5 sm:p-6" aria-labelledby="activity-heading">
            <SectionHeading eyebrow="Live log" title="Recent activity" action="View activity" />
            <div className="divide-y divide-[#1E3A5F]">{activity.map((item, index) => { const Icon = item.icon; return <div key={item.title} className="flex items-center gap-3 py-4 first:pt-1 last:pb-1" data-testid={`row-activity-${index}`}><div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[#12243A]"><Icon size={15} className={item.color} /></div><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-[#F8FAFC]">{item.title}</p><p className="mt-1 truncate text-[11px] text-[#64748B]">{item.detail}</p></div><span className="shrink-0 font-mono-data text-[10px] text-[#64748B]">{item.time}</span></div>; })}</div>
          </section>
          <section className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5 sm:p-6" aria-labelledby="status-heading">
            <SectionHeading eyebrow="Infrastructure" title="System status" action="Open status" />
            <div className="mb-5 flex items-center gap-3 border-b border-[#1E3A5F] pb-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#052E1A] text-[#4ADE80]"><CheckCircle2 size={18} /></span><div><p className="text-sm font-medium text-[#F8FAFC]" data-testid="status-system-overall">All systems operational</p><p className="mt-1 text-[11px] text-[#64748B]">Last checked 2 minutes ago</p></div><span className="ml-auto h-2 w-2 rounded-full bg-[#22C55E]" /></div>
            <div className="space-y-4">{[['Messaging API', '99.99%', 'Operational'], ['Realtime delivery', '99.98%', 'Operational'], ['Media processing', '99.95%', 'Operational'], ['Admin console', '100%', 'Operational']].map(([name, uptime], index) => <div key={name} data-testid={`row-system-${index}`}><div className="mb-2 flex items-center justify-between text-xs"><span className="text-[#94A3B8]">{name}</span><span className="font-mono-data text-[10px] text-[#4ADE80]">{uptime}</span></div><div className="h-1 overflow-hidden rounded-full bg-[#12243A]"><div className="h-full rounded-full bg-[#22C55E]" style={{ width: `${99.2 + index * .2}%` }} /></div></div>)}</div>
          </section>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <section className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5 sm:p-6"><SectionHeading eyebrow="Attention required" title="Open queues" /><div className="grid grid-cols-2 gap-3">{[['Report review', '184', '12 urgent', 'text-[#FBBF24]'], ['Account appeals', '37', '−4 since yesterday', 'text-[#60A5FA]'], ['Media takedowns', '16', '3 new today', 'text-[#F87171]'], ['Data requests', '28', 'within SLA', 'text-[#4ADE80]']].map(([label, value, note, color]) => <div key={label} className="rounded-md border border-[#1E3A5F] bg-[#12243A]/50 p-3"><p className="text-[11px] text-[#94A3B8]">{label}</p><p className={`mt-2 font-mono-data text-lg ${color}`}>{value}</p><p className="mt-1 text-[10px] text-[#64748B]">{note}</p></div>)}</div></section>
          <section className="rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-5 sm:p-6"><SectionHeading eyebrow="At a glance" title="Team shortcuts" /><div className="grid grid-cols-2 gap-2">{[['Identity & Users', '/admin/users'], ['Trust & Safety', '/admin/safety'], ['Analytics', '/admin/analytics'], ['Developer', '/admin/developer']].map(([label, href]) => <Link key={href} href={href} className="flex items-center justify-between rounded-md border border-[#1E3A5F] px-3 py-3 text-xs text-[#94A3B8] transition-colors hover:border-[#2563EB] hover:bg-[#12243A] hover:text-[#F8FAFC]" data-testid={`link-shortcut-${href.split('/').pop()}`}><span>{label}</span><ArrowUpRight size={14} /></Link>)}</div></section>
        </div>
        <p className="mt-8 pb-2 text-center font-mono-data text-[9px] uppercase tracking-[0.15em] text-[#475569]">KinChat control room · demo data · v0.1.0</p>
      </div>
    </div>
  );
}
