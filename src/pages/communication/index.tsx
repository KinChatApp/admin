import { MessageSquare } from 'lucide-react';
import { ComingSoonPage } from '@/components/layout/coming-soon-page';

export default function CommunicationPage() {
  return (
    <ComingSoonPage
      slug="communication"
      eyebrow="Workspace"
      title="Communication"
      description="Visibility into conversations, delivery, and the health of KinChat messaging."
      icon={MessageSquare}
    />
  );
}
