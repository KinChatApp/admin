import { GitBranch } from 'lucide-react';
import { ComingSoonPage } from '@/components/layout/coming-soon-page';

export default function DeveloperPage() {
  return (
    <ComingSoonPage
      slug="developer"
      eyebrow="Infrastructure"
      title="Developer"
      description="Tools and diagnostics for the teams extending KinChat."
      icon={GitBranch}
    />
  );
}
