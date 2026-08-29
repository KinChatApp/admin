import { FileWarning } from 'lucide-react';
import { ComingSoonPage } from '@/components/layout/coming-soon-page';

export default function ContentPage() {
  return (
    <ComingSoonPage
      slug="content"
      eyebrow="Workspace"
      title="Content & Media"
      description="A future home for media flows, storage, and content lifecycle operations."
      icon={FileWarning}
    />
  );
}
