import { createRoot } from 'react-dom/client';
import VConsole from 'vconsole';

import App from './App';
import { ErrorBoundary } from '@/components/layout/error-boundary';

import './index.css';

// vConsole ইনিশিয়ালাইজ করা হচ্ছে
const vConsole = new VConsole();

createRoot(document.getElementById('root')!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
