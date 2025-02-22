import type { Metadata } from 'next';

import './index.css';
import '@sixui/core/styles.css';

import { sixuiHtmlProps, SixuiProvider } from '@sixui/core';

export const metadata: Metadata = {
  title: 'Next.js + React + TS + Sixui',
  description: 'Generated by create next app',
};

const RootLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <html lang="en" {...sixuiHtmlProps}>
    <body>
      <SixuiProvider
        theme={{
          tokens: {
            typeFace: {
              plain: 'Roboto',
              brand: 'Roboto',
            },
          },
        }}
        colorSchemeVariant="light"
      >
        {children}
      </SixuiProvider>
    </body>
  </html>
);

export default RootLayout;
