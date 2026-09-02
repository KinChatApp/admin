import type { ComponentType } from 'react';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TinyLabel } from '@/components/layout/tiny-label';

type IconType = ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;

interface ComingSoonPageProps {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: IconType;
}

export function ComingSoonPage({ slug, eyebrow, title, description, icon: Icon }: ComingSoonPageProps) {
  return (
    <div className="panel-grid min-h-full">
      <div className="mx-auto flex min-h-[calc(100dvh-72px)] max-w-[1100px] items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-xl animate-rise-in text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] text-[#60A5FA]">
            <Icon size={24} strokeWidth={1.6} />
          </div>
          <TinyLabel>{eyebrow} · module</TinyLabel>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#F8FAFC] sm:text-4xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#94A3B8]">{description}</p>
          <div className="mx-auto mt-8 flex max-w-sm items-center gap-3 rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] px-4 py-3 text-left">
            <Clock3 size={16} className="shrink-0 text-[#64748B]" />
            <div>
              <p className="text-xs font-medium text-[#F8FAFC]">This module is in preparation</p>
              <p className="mt-1 text-[11px] leading-5 text-[#64748B]">The foundation is ready. Data views and actions will arrive here in a future release.</p>
            </div>
          </div>
          <Link to="/admin" className="mt-8 inline-flex items-center gap-2 text-xs font-medium text-[#60A5FA] hover:text-[#93C5FD]" data-testid={`link-return-overview-${slug}`}>
            Return to overview<ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
