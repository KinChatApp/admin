import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminShell } from '@/components/layout/admin-shell';
import { ErrorBoundary } from '@/components/layout/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Overview from '@/pages/overview';
import UsersPage from '@/pages/users';
import CommunicationPage from '@/pages/communication';
import CallsPage from '@/pages/calls';
import ContentPage from '@/pages/content';
import SafetyPage from '@/pages/safety';
import EngagementPage from '@/pages/engagement';
import AnalyticsPage from '@/pages/analytics';
import PlatformPage from '@/pages/platform';
import OperationsPage from '@/pages/operations';
import SecurityPage from '@/pages/security';
import DeveloperPage from '@/pages/developer';
import NotFound from '@/pages/not-found';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

const queryClient = new QueryClient();

function Home() {
  return <Overview />;
}

function AppRouter() {
  return (
    <RoutedErrorBoundary>
      <AdminShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Overview />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/communication/*" element={<CommunicationPage />} />
          <Route path="/admin/calls/*" element={<CallsPage />} />
          <Route path="/admin/content/*" element={<ContentPage />} />
          <Route path="/admin/safety/*" element={<SafetyPage />} />
          <Route path="/admin/engagement/*" element={<EngagementPage />} />
          <Route path="/admin/analytics/*" element={<AnalyticsPage />} />
          <Route path="/admin/platform/*" element={<PlatformPage />} />
          <Route path="/admin/operations/*" element={<OperationsPage />} />
          <Route path="/admin/security/*" element={<SecurityPage />} />
          <Route path="/admin/developer/*" element={<DeveloperPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AdminShell>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const location = useLocation();
  return <ErrorBoundary resetKey={location.pathname}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <AppRouter />
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
