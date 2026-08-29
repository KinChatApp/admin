import { Link, useLocation } from 'wouter';
import { CircleHelp, PanelLeftClose } from 'lucide-react';
import { navItems, navSections } from '@/components/navigation/nav-items';

function Brand({ collapsed }: { collapsed: boolean }) {
  return (
    <Link href="/admin" className="flex items-center gap-3 px-1 py-1.5" data-testid="link-brand-home">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[#2563EB] text-sm font-bold text-white shadow-[0_0_0_4px_rgba(37,99,235,0.12)]">K</span>
      {!collapsed && (
        <span className="leading-none">
          <span className="block text-[15px] font-semibold tracking-[-0.02em] text-[#F8FAFC]">KinChat</span>
          <span className="mt-1 block font-mono-data text-[9px] uppercase tracking-[0.18em] text-[#64748B]">Control room</span>
        </span>
      )}
    </Link>
  );
}

export function Sidebar({ collapsed, setCollapsed, onNavigate }: { collapsed: boolean; setCollapsed: (value: boolean) => void; onNavigate?: () => void }) {
  const [location] = useLocation();
  return (
    <aside className={`flex h-full shrink-0 flex-col border-r border-[#1E3A5F] bg-[#07111F] transition-[width] duration-200 ${collapsed ? 'w-[72px]' : 'w-[248px]'}`}>
      <div className={`flex h-[72px] items-center border-b border-[#1E3A5F] ${collapsed ? 'justify-center px-3' : 'justify-between px-5'}`}>
        <Brand collapsed={collapsed} />
        {!collapsed && (
          <button type="button" onClick={() => setCollapsed(true)} className="grid h-7 w-7 place-items-center rounded-md text-[#64748B] transition-colors hover:bg-[#12243A] hover:text-[#F8FAFC]" aria-label="Collapse sidebar" data-testid="button-collapse-sidebar">
            <PanelLeftClose size={16} />
          </button>
        )}
      </div>
      <nav className="quiet-scrollbar flex-1 overflow-y-auto px-3 py-5" aria-label="Admin navigation">
        {navSections.map((section) => (
          <div key={section} className="mb-6">
            {!collapsed && <p className="mb-2 px-3 font-mono-data text-[9px] font-medium uppercase tracking-[0.18em] text-[#64748B]">{section}</p>}
            <div className="space-y-0.5">
              {navItems.filter((item) => item.section === section).map((item) => {
                const active = location === item.href;
                const ItemIcon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={`group flex h-10 items-center gap-3 rounded-md px-3 text-[13px] transition-colors ${collapsed ? 'justify-center' : ''} ${active ? 'bg-[#12243A] font-medium text-[#F8FAFC]' : 'text-[#94A3B8] hover:bg-[#0D1B2A] hover:text-[#F8FAFC]'}`}
                    aria-current={active ? 'page' : undefined}
                    data-testid={`link-nav-${item.href.split('/').pop()}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <ItemIcon size={17} strokeWidth={active ? 2.2 : 1.8} className={active ? 'text-[#60A5FA]' : 'text-[#64748B] group-hover:text-[#94A3B8]'} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {!collapsed && active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#2563EB]" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className={`border-t border-[#1E3A5F] p-3 ${collapsed ? 'flex justify-center' : ''}`}>
        <button type="button" className={`flex items-center gap-3 rounded-md text-left transition-colors hover:bg-[#0D1B2A] ${collapsed ? 'p-2' : 'w-full px-3 py-2.5'}`} aria-label="Open help center" data-testid="button-help">
          <CircleHelp size={17} className="shrink-0 text-[#64748B]" />
          {!collapsed && <span className="text-xs text-[#94A3B8]">Help center</span>}
        </button>
      </div>
    </aside>
  );
}
