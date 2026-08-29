import { Server } from 'lucide-react';
import { ComingSoonPage } from '@/components/layout/coming-soon-page';

export default function OperationsPage() {
  return (
    <ComingSoonPage
      slug="operations"
      eyebrow="Infrastructure"
      title="Operations"
      description="Coordinate operational work with a clear, accountable view of the platform."
      icon={Server}
    />
  );
}
