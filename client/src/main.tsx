import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@/App';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { QueryProvider, ReduxProvider, ThemeProvider } from '@/providers';

const basename = import.meta.env.VITE_BASE_URL || '/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ReduxProvider>
        <ThemeProvider>
          <QueryProvider>
            <BrowserRouter basename={basename}>
              <App />
            </BrowserRouter>
          </QueryProvider>
        </ThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  </StrictMode>,
);
