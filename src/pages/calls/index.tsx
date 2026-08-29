import { Video } from 'lucide-react';
import { ComingSoonPage } from '@/components/layout/coming-soon-page';

export default function CallsPage() {
  return (
    <ComingSoonPage
      slug="calls"
      eyebrow="Workspace"
      title="Calls"
      description="Monitor voice and video reliability across the KinChat network."
      icon={Video}
    />
  );
}
