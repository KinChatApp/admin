import { MoreHorizontal, LucideIcon } from 'lucide-react';

export type Stat = {
  label: string;
  value: string | number;
  delta: string;
  detail: string;
  icon: LucideIcon;
  tone: 'blue' | 'green' | 'amber';
};

export function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;
  const iconClass = stat.tone === 'amber' 
    ? 'bg-[#422006] text-[#FBBF24]' 
    : stat.tone === 'green' 
      ? 'bg-[#052E1A] text-[#4ADE80]' 
      : 'bg-[#172554] text-[#60A5FA]';

  return (
    <div className="group rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-4 transition-colors hover:border-[#2B5689] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className={`grid h-8 w-8 place-items-center rounded-md ${iconClass}`}>
          <Icon size={16} />
        </div>
        <button type="button" className="grid h-7 w-7 place-items-center rounded text-[#64748B] opacity-0 transition-opacity hover:bg-[#12243A] hover:text-[#F8FAFC] group-hover:opacity-100">
          <MoreHorizontal size={16} />
        </button>
      </div>
      <p className="mt-5 text-[11px] text-[#94A3B8]">{stat.label}</p>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <p className="font-mono-data text-[22px] font-medium tracking-[-0.04em] text-[#F8FAFC] sm:text-[24px]">
          {stat.value.toLocaleString()}
        </p>
        <span className={`font-mono-data text-[10px] ${stat.tone === 'amber' ? 'text-[#FBBF24]' : 'text-[#4ADE80]'}`}>
          {stat.delta}
        </span>
      </div>
      <p className="mt-1 text-[10px] text-[#64748B]">{stat.detail}</p>
    </div>
  );
}
