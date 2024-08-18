import { forwardRef, useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IAppShellProps } from './AppShell.types';
import { useStyles } from '~/hooks/useStyles';
import { appShellStyles } from './AppShell.styles';
import { AppShellHeader } from './AppShellHeader';
import { AppShellNavigationDrawer } from './AppShellNavigationDrawer';
import { AppShellMain } from './AppShellMain';
import { AppShellBody } from './AppShellBody';
import {
  AppShellProvider,
  type IAppShellContextValue,
} from './AppShell.context';
import { AppShellAside } from './AppShellAside';
import { AppShellFooter } from './AppShellFooter';

const AppShell = forwardRef<HTMLDivElement, IAppShellProps>(
  function AppShell(props, forwardedRef) {
    const { styles, sx, children, navigationDrawer, aside, ...other } = props;

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'AppShell',
      styles: [appShellStyles, styles],
    });
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

    const contextValue: IAppShellContextValue = {
      root: rootElement,
      navigationDrawer,
      aside,
    };

    return (
      <AppShellProvider value={contextValue}>
        <div {...stylex.props(globalStyles, sx)} {...other} ref={forwardedRef}>
          <div ref={setRootElement} />
          {children}
        </div>
      </AppShellProvider>
    );
  },
);

const AppShellNamespace = Object.assign(AppShell, {
  Header: AppShellHeader,
  NavigationDrawer: AppShellNavigationDrawer,
  Main: AppShellMain,
  Body: AppShellBody,
  Aside: AppShellAside,
  Footer: AppShellFooter,
});

export { AppShellNamespace as AppShell };
