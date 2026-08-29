import type { ReactNode } from 'react';

export function TinyLabel({ children }: { children: ReactNode }) {
  return <span className="font-mono-data text-[10px] uppercase tracking-[0.16em] text-[#64748B]">{children}</span>;
}
