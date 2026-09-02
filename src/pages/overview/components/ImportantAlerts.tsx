import { AlertOctagon, Info } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export function ImportantAlerts() {
  return (
    <section className="rounded-lg border border-[#422006] bg-[#2A1508]/30 p-5 sm:p-6">
      <SectionHeading eyebrow="Attention" title="Important Alerts & Incidents" action="View all" href="/admin/operations" />
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <div className="flex items-start gap-3 rounded-md border border-[#991B1B]/30 bg-[#450A0A]/40 p-3">
          <AlertOctagon size={16} className="mt-0.5 shrink-0 text-[#F87171]" />
          <div>
            <h4 className="text-sm font-medium text-[#FECACA]">Storage API Latency Spike</h4>
            <p className="mt-1 text-xs text-[#FCA5A5]/80">Media uploads are taking 3x longer than usual in the Dhaka region.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-md border border-[#1E3A5F] bg-[#172554]/20 p-3">
          <Info size={16} className="mt-0.5 shrink-0 text-[#60A5FA]" />
          <div>
            <h4 className="text-sm font-medium text-[#BFDBFE]">Database Migration Scheduled</h4>
            <p className="mt-1 text-xs text-[#93C5FD]/80">Routine maintenance scheduled for tonight at 2:00 AM (BST).</p>
          </div>
        </div>
      </div>
    </section>
  );
}
