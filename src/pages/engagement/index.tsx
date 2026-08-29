import { Activity } from 'lucide-react';
import { ComingSoonPage } from '@/components/layout/coming-soon-page';

export default function EngagementPage() {
  return (
    <ComingSoonPage
      slug="engagement"
      eyebrow="Governance"
      title="Engagement"
      description="Understand the rhythms that keep teams connected and conversations moving."
      icon={Activity}
    />
  );
}
