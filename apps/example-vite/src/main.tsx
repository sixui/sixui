import { StrictMode } from 'react';
import { SixuiProvider } from '@sixui/core';
import { createRoot } from 'react-dom/client';

import './index.css';
import '@sixui/core/styles.css';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SixuiProvider
      theme={{
        tokens: {
          typeFace: {
            plain: 'Roboto',
            brand: 'Roboto',
          },
        },
      }}
    >
      <App />
    </SixuiProvider>
  </StrictMode>,
);
