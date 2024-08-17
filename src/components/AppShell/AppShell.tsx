import { forwardRef, useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IAppShellProps } from './AppShell.types';
import { useStyles } from '~/hooks/useStyles';
import { appShellStyles } from './AppShell.styles';
import { AppShellNavigationDrawer } from './AppShellNavigationDrawer';
import { AppShellBody } from './AppShellBody';
import {
  AppShellProvider,
  type IAppShellContextValue,
} from './AppShell.context';

const AppShell = forwardRef<HTMLDivElement, IAppShellProps>(
  function AppShell(props, forwardedRef) {
    const { styles, sx, children, navigationDrawer, ...other } = props;

    const { combineStyles, getStyles, globalStyles } = useStyles({
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
        <div {...stylex.props(globalStyles, sx)} {...other} ref={forwardedRef}>
          <div ref={setRootElement} />
          <div {...getStyles('main')}>{children}</div>
          <div>FOOTER</div>
        </div>
      </AppShellProvider>
    );
  },
);

const AppShellNamespace = Object.assign(AppShell, {
  NavigationDrawer: AppShellNavigationDrawer,
  Body: AppShellBody,
});

export { AppShellNamespace as AppShell };
