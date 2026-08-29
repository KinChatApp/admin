import { Blocks } from 'lucide-react';
import { ComingSoonPage } from '@/components/layout/coming-soon-page';

export default function PlatformPage() {
  return (
    <ComingSoonPage
      slug="platform"
      eyebrow="Infrastructure"
      title="Platform"
      description="Service-level visibility across the systems that power KinChat."
      icon={Blocks}
    />
  );
}
