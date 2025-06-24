import type { Decorator } from '@storybook/react-vite';
import { SixuiProvider } from '@sixui/core';

// TODO: migrate to storybook 9
// import { useDarkMode } from 'storybook-dark-mode';

const useDarkMode = (): boolean => false;

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
