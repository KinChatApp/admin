import type { ComponentType } from 'react';

export type NavIcon = ComponentType<{
  className?: string;
  size?: number;
  strokeWidth?: number;
}>;

export type NavItem = {
  label: string;
  href: string;
  icon: NavIcon;
  section: string;
};
