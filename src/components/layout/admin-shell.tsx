import { useEffect, useState, type ReactNode } from 'react';
import { PanelLeftOpen } from 'lucide-react';
import { Sidebar } from '@/components/navigation/sidebar';
import { Header, SearchDialog } from '@/components/layout/header';

export function AdminShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return (
    <div className="flex min-h-[100dvh] bg-[#07111F] text-[#F8FAFC]">
      <div className="hidden lg:block"><Sidebar collapsed={collapsed} setCollapsed={setCollapsed} /></div>
      {mobileOpen && <div className="fixed inset-0 z-40 bg-[#020914]/75 lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />}
      <div className={`fixed inset-y-0 left-0 z-50 lg:hidden ${mobileOpen ? 'animate-drawer-in' : 'hidden'}`}>
        <Sidebar collapsed={false} setCollapsed={() => setMobileOpen(false)} onNavigate={() => setMobileOpen(false)} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenu={() => setMobileOpen(true)} onSearch={() => setSearchOpen(true)} />
        <main className="quiet-scrollbar flex-1 overflow-y-auto">{children}</main>
      </div>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      {collapsed && <button type="button" onClick={() => setCollapsed(false)} className="fixed bottom-5 left-4 z-20 hidden h-9 w-9 place-items-center rounded-md border border-[#1E3A5F] bg-[#0D1B2A] text-[#94A3B8] shadow-lg hover:text-[#F8FAFC] lg:grid" aria-label="Expand sidebar" data-testid="button-expand-sidebar"><PanelLeftOpen size={16} /></button>}
    </div>
  );
}
