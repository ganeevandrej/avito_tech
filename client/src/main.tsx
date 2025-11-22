import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@/App';
import { QueryProvider, ReduxProvider,ThemeProvider } from '@/providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <ThemeProvider>
        <QueryProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryProvider>
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>,
);
