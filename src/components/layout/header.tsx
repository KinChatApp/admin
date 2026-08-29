import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Bell,
  ChevronDown,
  ChevronRight,
  LockKeyhole,
  Menu,
  Search,
  Users,
  X,
} from 'lucide-react';
import { navItems } from '@/components/navigation/nav-items';

export function Header({ onMenu, onSearch }: { onMenu: () => void; onSearch: () => void }) {
  const [location] = useLocation();
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const current = navItems.find((item) => item.href === location) ?? navItems[0];
  return (
    <header className="relative flex h-[72px] shrink-0 items-center justify-between border-b border-[#1E3A5F] bg-[#07111F] px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button type="button" onClick={onMenu} className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-[#94A3B8] hover:bg-[#12243A] hover:text-[#F8FAFC] lg:hidden" aria-label="Open navigation" data-testid="button-open-navigation">
          <Menu size={19} />
        </button>
        <div className="hidden items-center gap-2 text-xs text-[#64748B] sm:flex">
          <span className="font-mono-data">ADMIN</span>
          <ChevronRight size={13} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[#F8FAFC]" data-testid="text-breadcrumb-page">{current.label}</p>
          <p className="hidden truncate text-[11px] text-[#64748B] sm:block">KinChat internal operations</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button type="button" onClick={onSearch} className="group flex h-9 items-center gap-2 rounded-md border border-[#1E3A5F] bg-[#0D1B2A] px-2.5 text-[#64748B] transition-colors hover:border-[#2563EB] hover:text-[#94A3B8] sm:w-[190px]" aria-label="Search the admin panel" data-testid="button-global-search">
          <Search size={15} />
          <span className="hidden text-xs sm:inline">Search panel</span>
          <kbd className="ml-auto hidden rounded border border-[#1E3A5F] px-1.5 py-0.5 font-mono-data text-[9px] text-[#64748B] md:inline">⌘ K</kbd>
        </button>
        <div className="relative">
          <button type="button" onClick={() => { setNoticeOpen(!noticeOpen); setProfileOpen(false); }} className="relative grid h-9 w-9 place-items-center rounded-md text-[#94A3B8] transition-colors hover:bg-[#12243A] hover:text-[#F8FAFC]" aria-label="View notifications" data-testid="button-notifications">
            <Bell size={17} />
            <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
          </button>
          {noticeOpen && (
            <div className="animate-rise-in absolute right-0 top-11 z-30 w-72 rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-1 shadow-2xl">
              <div className="flex items-center justify-between px-3 py-2.5"><p className="text-xs font-semibold text-[#F8FAFC]">Notifications</p><span className="font-mono-data text-[10px] text-[#64748B]">01 unread</span></div>
              <div className="border-t border-[#1E3A5F] px-3 py-3"><p className="text-xs text-[#94A3B8]">System health check completed</p><p className="mt-1 font-mono-data text-[10px] text-[#64748B]">12 minutes ago</p></div>
            </div>
          )}
        </div>
        <div className="relative ml-1 border-l border-[#1E3A5F] pl-2 sm:ml-2 sm:pl-3">
          <button type="button" onClick={() => { setProfileOpen(!profileOpen); setNoticeOpen(false); }} className="flex items-center gap-2 rounded-md px-1.5 py-1.5 text-left transition-colors hover:bg-[#12243A]" aria-label="Open profile menu" data-testid="button-profile-menu">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1D4ED8] font-mono-data text-[10px] font-semibold text-white">MA</span>
            <span className="hidden sm:block"><span className="block text-xs font-medium text-[#F8FAFC]">Maya Adams</span><span className="block text-[10px] text-[#64748B]">Super admin</span></span>
            <ChevronDown size={14} className="hidden text-[#64748B] sm:block" />
          </button>
          {profileOpen && (
            <div className="animate-rise-in absolute right-0 top-12 z-30 w-48 rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] p-1 shadow-2xl">
              <button type="button" className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-[#94A3B8] hover:bg-[#12243A] hover:text-[#F8FAFC]" data-testid="button-view-profile"><Users size={14} />Profile settings</button>
              <button type="button" className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-[#94A3B8] hover:bg-[#12243A] hover:text-[#F8FAFC]" data-testid="button-sign-out"><LockKeyhole size={14} />Sign out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);
  if (!open) return null;
  const matches = navItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#020914]/80 px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search admin panel" data-testid="dialog-global-search">
      <div className="w-full max-w-lg overflow-hidden rounded-lg border border-[#1E3A5F] bg-[#0D1B2A] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[#1E3A5F] px-4">
          <Search size={17} className="text-[#64748B]" />
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pages..." className="h-12 min-w-0 flex-1 bg-transparent text-sm text-[#F8FAFC] outline-none placeholder:text-[#64748B]" aria-label="Search pages" data-testid="input-global-search" />
          <button type="button" onClick={onClose} className="grid h-7 w-7 place-items-center rounded text-[#64748B] hover:bg-[#12243A] hover:text-[#F8FAFC]" aria-label="Close search" data-testid="button-close-search"><X size={15} /></button>
        </div>
        <div className="max-h-72 overflow-y-auto p-2">
          {matches.length > 0 ? matches.map((item) => {
            const ItemIcon = item.icon;
            return <Link key={item.href} href={item.href} onClick={onClose} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#94A3B8] hover:bg-[#12243A] hover:text-[#F8FAFC]" data-testid={`link-search-${item.href.split('/').pop()}`}><ItemIcon size={16} /><span>{item.label}</span><span className="ml-auto font-mono-data text-[10px] text-[#64748B]">{item.section}</span></Link>;
          }) : <p className="px-3 py-6 text-center text-xs text-[#64748B]">No pages match that search.</p>}
        </div>
      </div>
    </div>
  );
}
