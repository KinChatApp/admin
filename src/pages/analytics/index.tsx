import { BarChart3 } from 'lucide-react';
import { ComingSoonPage } from '@/components/layout/coming-soon-page';

export default function AnalyticsPage() {
  return (
    <ComingSoonPage
      slug="analytics"
      eyebrow="Intelligence"
      title="Analytics"
      description="A focused workspace for product signals, trends, and operational reporting."
      icon={BarChart3}
    />
  );
}
