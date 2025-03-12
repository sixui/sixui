import type { Decorator } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

import { CustomizableTheme } from '~/components/CustomizableTheme';
import { SixuiProvider } from '~/components/Sixui';
import { classNames } from './SixuiProviderDecorator.css';

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
      <CustomizableTheme className={classNames.root}>
        <div className={classNames.storyWrapper}>
          <Story />
        </div>
      </CustomizableTheme>
    </SixuiProvider>
  );
};
