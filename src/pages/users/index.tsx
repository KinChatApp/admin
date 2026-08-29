import { Users } from 'lucide-react';
import { ComingSoonPage } from '@/components/layout/coming-soon-page';

export default function UsersPage() {
  return (
    <ComingSoonPage
      slug="users"
      eyebrow="Workspace"
      title="Identity & Users"
      description="Manage the people and identity signals that make KinChat a trusted place to connect."
      icon={Users}
    />
  );
}
