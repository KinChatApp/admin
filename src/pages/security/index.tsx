import { LockKeyhole } from 'lucide-react';
import { ComingSoonPage } from '@/components/layout/coming-soon-page';

export default function SecurityPage() {
  return (
    <ComingSoonPage
      slug="security"
      eyebrow="Infrastructure"
      title="Security"
      description="Protect the people and systems behind every KinChat conversation."
      icon={LockKeyhole}
    />
  );
}
