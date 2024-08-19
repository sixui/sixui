import { forwardRef, useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IAppLayoutProps } from './AppLayout.types';
import { useStyles } from '~/hooks/useStyles';
import { appShellStyles } from './AppLayout.styles';
import { AppLayoutHeader } from './AppLayoutHeader';
import { AppLayoutNavigationDrawer } from './AppLayoutNavigationDrawer';
import { AppLayoutBody } from './AppLayoutBody';
import {
  AppLayoutProvider,
  type IAppLayoutContextValue,
} from './AppLayout.context';
import { AppLayoutAside } from './AppLayoutAside';
import { AppLayoutListDetailBody } from './AppLayoutListDetailBody';
import { AppLayoutPane } from './AppLayoutPane';
import { AppLayoutFooter } from './AppLayoutFooter';

const AppLayout = forwardRef<HTMLDivElement, IAppLayoutProps>(
  function AppLayout(props, forwardedRef) {
    const { styles, sx, children, window, navigationDrawer, aside, ...other } =
      props;

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppLayout',
      styles: [appShellStyles, styles],
    });
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

    const contextValue: IAppLayoutContextValue = {
      window: window,
      root: rootElement,
      navigationDrawer,
      aside,
    };

    return (
      <AppLayoutProvider value={contextValue}>
        <div
          {...stylex.props(globalStyles, combineStyles('host'), sx)}
          {...other}
          ref={forwardedRef}
        >
          <div ref={setRootElement} />
          {children}
        </div>
      </AppLayoutProvider>
    );
  },
);

const AppLayoutNamespace = Object.assign(AppLayout, {
  Header: AppLayoutHeader,
  NavigationDrawer: AppLayoutNavigationDrawer,
  Body: AppLayoutBody,
  ListDetailBody: AppLayoutListDetailBody,
  Pane: AppLayoutPane,
  Aside: AppLayoutAside,
  Footer: AppLayoutFooter,
});

export { AppLayoutNamespace as AppLayout };
