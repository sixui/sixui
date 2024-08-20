import { forwardRef, useMemo, useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IAppLayoutProps } from './AppLayout.types';
import { useStyles } from '~/hooks/useStyles';
import { isFunction } from '~/helpers/isFunction';
import { useDisclosure } from '~/hooks/useDisclosure';
import { useSideSheet } from '../SideSheet/useSideSheet';
import { appLayoutStyles } from './AppLayout.styles';
import { AppLayoutHeader } from './AppLayoutHeader';
import { AppLayoutNavigationDrawer } from './AppLayoutNavigationDrawer';
import { AppLayoutBody } from './AppLayoutBody';
import {
  AppLayoutProvider,
  type IAppLayoutContextValue,
} from './AppLayout.context';
import { AppLayoutAside } from './AppLayoutAside';
import { AppLayoutPane } from './AppLayoutPane';
import { AppLayoutFooter } from './AppLayoutFooter';
import { AppLayoutNavigationRail } from './AppLayoutNavigationRail';
import {
  AppLayoutSetterProvider,
  IAppLayoutSetterContextValue,
} from './AppLayoutSetter.context';
import {
  useCanonicalLayout,
  type ICanonicalLayoutType,
} from './useCanonicalLayout';
import { AppLayoutSideSheet } from './AppLayoutSideSheet';

const AppLayout = forwardRef<HTMLDivElement, IAppLayoutProps>(
  function AppLayout(props, forwardedRef) {
    const {
      styles,
      sx,
      children,
      window,
      navigationDrawer,
      navigationRail,
      aside,
      defaultCanonicalLayoutType,
      preferredNavigationMode = 'standard',
      components,
      ...other
    } = props;

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppLayout',
      styles: [appLayoutStyles, styles],
    });
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const [canonicalLayoutType, setCanonicalLayoutType] =
      useState<ICanonicalLayoutType>(
        defaultCanonicalLayoutType ?? 'listDetail',
      );
    const canonicalLayout = useCanonicalLayout(canonicalLayoutType, {
      window,
      preferredNavigationMode,
    });

    const setterContextValue: IAppLayoutSetterContextValue = useMemo(
      () => ({
        setCanonicalLayoutType,
      }),
      [],
    );

    const [navigationDrawerOpened, navigationDrawerCallbacks] = useDisclosure(
      !navigationDrawer?.defaultClosed,
    );
    const navigationDrawerType =
      canonicalLayout.navigationMode === 'standard' ? 'standard' : 'modal';
    const navigationDrawerState = useSideSheet({
      opened: navigationDrawerOpened,
      type: navigationDrawerType,
      onOpen: navigationDrawerCallbacks.open,
      onClose: navigationDrawerCallbacks.close,
    });
    const hasNavigationDrawer = components.includes('navigationDrawer');

    const [asideOpened, asideCallbacks] = useDisclosure(!aside?.defaultClosed);
    const asideType = canonicalLayout.standardAside ? 'standard' : 'modal';
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
        navigationRail,
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
        canonicalLayout,
        preferredNavigationMode,
        components,
      };

      return value;
    }, [
      window,
      rootElement,
      navigationRail,
      components,
      canonicalLayout,
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
      <AppLayoutSetterProvider value={setterContextValue}>
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
      </AppLayoutSetterProvider>
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
