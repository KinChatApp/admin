import {
  Activity,
  BarChart3,
  Blocks,
  FileVideo,
  GitBranch,
  Headphones,
  LayoutDashboard,
  LockKeyhole,
  MessageSquare,
  Server,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { NavItem } from '@/types/nav';

export const navItems: NavItem[] = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard, section: 'Workspace' },
  { label: 'Identity & Users', href: '/admin/users', icon: Users, section: 'Workspace' },
  { label: 'Communication', href: '/admin/communication', icon: MessageSquare, section: 'Workspace' },
  { label: 'Calls', href: '/admin/calls', icon: Headphones, section: 'Workspace' },
  { label: 'Content & Media', href: '/admin/content', icon: FileVideo, section: 'Workspace' },
  { label: 'Trust & Safety', href: '/admin/safety', icon: ShieldCheck, section: 'Governance' },
  { label: 'Engagement', href: '/admin/engagement', icon: Activity, section: 'Governance' },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, section: 'Intelligence' },
  { label: 'Platform', href: '/admin/platform', icon: Blocks, section: 'Infrastructure' },
  { label: 'Operations', href: '/admin/operations', icon: Server, section: 'Infrastructure' },
  { label: 'Security', href: '/admin/security', icon: LockKeyhole, section: 'Infrastructure' },
  { label: 'Developer', href: '/admin/developer', icon: GitBranch, section: 'Infrastructure' },
];

export const navSections = ['Workspace', 'Governance', 'Intelligence', 'Infrastructure'] as const;
