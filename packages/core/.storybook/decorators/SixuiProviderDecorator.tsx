import type { Decorator } from '@storybook/react-vite';

// TODO: migrate to storybook 9
// import { useDarkMode } from 'storybook-dark-mode';

import { CustomizableTheme } from '~/components/CustomizableTheme';
import { SixuiProvider } from '~/components/Sixui';
import { classNames } from './SixuiProviderDecorator.css';

const useDarkMode = (): boolean => false;

export const SixuiProviderDecorator: Decorator = (Story) => {
  // TODO: migrate to storybook 9
  const isDarkMode = useDarkMode();

  return (
    <SixuiProvider
      defaultColorScheme={isDarkMode ? 'dark' : 'light'}
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
