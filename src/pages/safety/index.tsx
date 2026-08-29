import { ShieldAlert } from 'lucide-react';
import { ComingSoonPage } from '@/components/layout/coming-soon-page';

export default function SafetyPage() {
  return (
    <ComingSoonPage
      slug="safety"
      eyebrow="Governance"
      title="Trust & Safety"
      description="Keep the community safe with clear review queues and responsible enforcement tools."
      icon={ShieldAlert}
    />
  );
}
