import type { Decorator } from '@storybook/react';
import { SixuiProvider } from '@sixui/core';
import { useDarkMode } from 'storybook-dark-mode';

export const SixuiProviderDecorator: Decorator = (Story) => {
  const isDarkMode = useDarkMode();

  return (
    <SixuiProvider
      colorSchemeVariant={isDarkMode ? 'dark' : 'light'}
      theme={{
        tokens: {
          typeFace: {
            plain: 'Roboto',
            brand: 'Roboto',
          },
        },
      }}
    >
      <Story />
    </SixuiProvider>
  );
};
