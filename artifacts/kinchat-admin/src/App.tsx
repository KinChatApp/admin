import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminShell } from '@/components/admin-shell';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ComingSoon, Overview } from '@/pages/admin-pages';
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
          <Route path="/admin/users"><ComingSoon page="users" /></Route>
          <Route path="/admin/communication"><ComingSoon page="communication" /></Route>
          <Route path="/admin/calls"><ComingSoon page="calls" /></Route>
          <Route path="/admin/content"><ComingSoon page="content" /></Route>
          <Route path="/admin/safety"><ComingSoon page="safety" /></Route>
          <Route path="/admin/engagement"><ComingSoon page="engagement" /></Route>
          <Route path="/admin/analytics"><ComingSoon page="analytics" /></Route>
          <Route path="/admin/platform"><ComingSoon page="platform" /></Route>
          <Route path="/admin/operations"><ComingSoon page="operations" /></Route>
          <Route path="/admin/security"><ComingSoon page="security" /></Route>
          <Route path="/admin/developer"><ComingSoon page="developer" /></Route>
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
