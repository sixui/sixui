import { forwardRef, useMemo, useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IUseWindowSizeClassResult } from '~/hooks/useWindowSizeClass';
import type { IAppLayoutContextValue } from './AppLayout.context';
import type {
  IAppLayoutNavigationMode,
  IAppLayoutProps,
} from './AppLayout.types';
import { isFunction } from '~/helpers/isFunction';
import { useDisclosure } from '~/hooks/useDisclosure';
import { useSideSheet } from '~/hooks/useSideSheet';
import { useStyles } from '~/hooks/useStyles';
import { useWindowSizeClass } from '~/hooks/useWindowSizeClass';
import { AppLayoutProvider } from './AppLayout.context';
import { appLayoutStyles } from './AppLayout.styles';
import { AppLayoutAside } from './AppLayoutAside';
import { AppLayoutBody } from './AppLayoutBody';
import { AppLayoutFooter } from './AppLayoutFooter';
import { AppLayoutHeader } from './AppLayoutHeader';
import { AppLayoutNavigationDrawer } from './AppLayoutNavigationDrawer';
import { AppLayoutNavigationRail } from './AppLayoutNavigationRail';
import { AppLayoutPane } from './AppLayoutPane';
import { AppLayoutSideSheet } from './AppLayoutSideSheet';

const resolveNavigationMode = (
  windowSizeClass: IUseWindowSizeClassResult | undefined,
  preferredNavigationMode: IAppLayoutNavigationMode,
): IAppLayoutNavigationMode => {
  if (windowSizeClass?.compact) {
    return 'bar';
  }

  if (windowSizeClass?.medium) {
    return 'rail';
  }

  if (windowSizeClass?.expanded) {
    return 'rail';
  }

  return preferredNavigationMode;
};

const AppLayout = forwardRef<HTMLDivElement, IAppLayoutProps>(
  function AppLayout(props, forwardedRef) {
    const {
      styles,
      sx,
      children,
      window: windowProp,
      navigationDrawer,
      aside,
      preferredNavigationMode = 'standard',
      components,
      ...other
    } = props;

    const { combineStyles, globalStyles } = useStyles({
      componentName: 'AppLayout',
      styles: [appLayoutStyles, styles],
    });
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const windowSizeClass = useWindowSizeClass({
      window: windowProp ?? window,
    });

    const navigationMode = resolveNavigationMode(
      windowSizeClass,
      preferredNavigationMode,
    );

    const [navigationDrawerOpened, navigationDrawerCallbacks] = useDisclosure(
      !navigationDrawer?.defaultClosed,
    );
    const navigationDrawerType =
      navigationMode === 'standard' ? 'standard' : 'modal';
    const navigationDrawerState = useSideSheet({
      opened: navigationDrawerOpened,
      type: navigationDrawerType,
      onOpen: navigationDrawerCallbacks.open,
      onClose: navigationDrawerCallbacks.close,
    });
    const hasNavigationDrawer = components.includes('navigationDrawer');

    const [asideOpened, asideCallbacks] = useDisclosure(!aside?.defaultClosed);
    const asideType = windowSizeClass?.extraLargeAndUp ? 'standard' : 'modal';
    const asideState = useSideSheet({
      opened: asideOpened,
      type: asideType,
      onOpen: asideCallbacks.open,
      onClose: asideCallbacks.close,
    });
    const hasAside = components.includes('aside');

    const contextValue = useMemo<IAppLayoutContextValue>(() => {
      const value: IAppLayoutContextValue = {
        window: window,
        root: rootElement,
        navigationDrawer: {
          ...navigationDrawer,
          state: hasNavigationDrawer
            ? {
                opened: navigationDrawerOpened,
                type: navigationDrawerType,
                modalOpened: navigationDrawerState.modalOpened,
                standardOpened: navigationDrawerState.standardOpened,
                toggle: navigationDrawerCallbacks.toggle,
                open: navigationDrawerCallbacks.open,
                close: navigationDrawerCallbacks.close,
              }
            : undefined,
        },
        aside: {
          ...aside,
          state: hasAside
            ? {
                opened: asideOpened,
                type: asideType,
                modalOpened: asideState.modalOpened,
                standardOpened: asideState.standardOpened,
                toggle: asideCallbacks.toggle,
                open: asideCallbacks.open,
                close: asideCallbacks.close,
              }
            : undefined,
        },
        navigationMode,
        preferredNavigationMode,
        components,
      };

      return value;
    }, [
      rootElement,
      components,
      navigationMode,
      preferredNavigationMode,
      navigationDrawer,
      hasNavigationDrawer,
      navigationDrawerOpened,
      navigationDrawerType,
      navigationDrawerState.modalOpened,
      navigationDrawerState.standardOpened,
      navigationDrawerCallbacks.toggle,
      navigationDrawerCallbacks.open,
      navigationDrawerCallbacks.close,
      aside,
      hasAside,
      asideOpened,
      asideType,
      asideState.modalOpened,
      asideState.standardOpened,
      asideCallbacks.toggle,
      asideCallbacks.open,
      asideCallbacks.close,
    ]);

    return (
      <AppLayoutProvider value={contextValue}>
        <div
          {...stylex.props(globalStyles, combineStyles('host'), sx)}
          {...other}
          ref={forwardedRef}
        >
          <div ref={setRootElement} />
          {isFunction(children) ? children(contextValue) : children}
        </div>
      </AppLayoutProvider>
    );
  },
);

const AppLayoutNamespace = Object.assign(AppLayout, {
  Header: AppLayoutHeader,
  SideSheet: AppLayoutSideSheet,
  NavigationDrawer: AppLayoutNavigationDrawer,
  NavigationRail: AppLayoutNavigationRail,
  Body: AppLayoutBody,
  Pane: AppLayoutPane,
  Aside: AppLayoutAside,
  Footer: AppLayoutFooter,
});

export { AppLayoutNamespace as AppLayout };
