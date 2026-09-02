import { ArrowUpRight } from 'lucide-react';
import { TinyLabel } from '@/components/layout/tiny-label';
import { Link } from 'react-router-dom';

export function SectionHeading({ 
  eyebrow, 
  title, 
  action, 
  href 
}: { 
  eyebrow: string; 
  title: string; 
  action?: string;
  href?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <TinyLabel>{eyebrow}</TinyLabel>
        <h2 className="mt-1 text-[17px] font-semibold tracking-[-0.02em] text-[#F8FAFC]">{title}</h2>
      </div>
      {action && href ? (
        <Link to={href} className="text-xs text-[#60A5FA] hover:text-[#93C5FD]">
          {action}
          <ArrowUpRight size={13} className="ml-1 inline" />
        </Link>
      ) : action ? (
        <button type="button" className="text-xs text-[#60A5FA] hover:text-[#93C5FD]">
          {action}
          <ArrowUpRight size={13} className="ml-1 inline" />
        </button>
      ) : null}
    </div>
  );
}
