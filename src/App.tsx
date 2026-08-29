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
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  return <Overview />;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <AdminShell>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/admin" component={Overview} />
          <Route path="/admin/users" component={UsersPage} />
          <Route path="/admin/communication" component={CommunicationPage} />
          <Route path="/admin/communication/:rest*" component={CommunicationPage} />
          <Route path="/admin/calls" component={CallsPage} />
          <Route path="/admin/calls/:rest*" component={CallsPage} />
          <Route path="/admin/content" component={ContentPage} />
          <Route path="/admin/content/:rest*" component={ContentPage} />
          <Route path="/admin/safety" component={SafetyPage} />
          <Route path="/admin/safety/:rest*" component={SafetyPage} />
          <Route path="/admin/engagement" component={EngagementPage} />
          <Route path="/admin/engagement/:rest*" component={EngagementPage} />
          <Route path="/admin/analytics" component={AnalyticsPage} />
          <Route path="/admin/analytics/:rest*" component={AnalyticsPage} />
          <Route path="/admin/platform" component={PlatformPage} />
          <Route path="/admin/platform/:rest*" component={PlatformPage} />
          <Route path="/admin/operations" component={OperationsPage} />
          <Route path="/admin/operations/:rest*" component={OperationsPage} />
          <Route path="/admin/security" component={SecurityPage} />
          <Route path="/admin/security/:rest*" component={SecurityPage} />
          <Route path="/admin/developer" component={DeveloperPage} />
          <Route path="/admin/developer/:rest*" component={DeveloperPage} />
          <Route component={NotFound} />
        </Switch>
      </AdminShell>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
