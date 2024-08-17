import { forwardRef, useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IAppShellProps } from './AppShell.types';
import { useStyles } from '~/hooks/useStyles';
import { appShellStyles } from './AppShell.styles';
import { AppShellNavigationDrawer } from './AppShellNavigationDrawer';
import { AppShellMain } from './AppShellMain';
import {
  AppShellProvider,
  type IAppShellContextValue,
} from './AppShell.context';

const AppShell = forwardRef<HTMLDivElement, IAppShellProps>(
  function AppShell(props, forwardedRef) {
    const { styles, sx, children, navigationDrawer, ...other } = props;

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppShell',
      styles: [appShellStyles, styles],
    });
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

    const contextValue: IAppShellContextValue = {
      root: rootElement,
      navigationDrawer,
    };

    return (
      <AppShellProvider value={contextValue}>
        <div
          {...other}
          {...stylex.props(globalStyles, combineStyles('host'), sx)}
          ref={forwardedRef}
        >
          <div ref={setRootElement} />
          {children}
        </div>
      </AppShellProvider>
    );
  },
);

const AppShellNamespace = Object.assign(AppShell, {
  NavigationDrawer: AppShellNavigationDrawer,
  Main: AppShellMain,
});

export { AppShellNamespace as AppShell };
