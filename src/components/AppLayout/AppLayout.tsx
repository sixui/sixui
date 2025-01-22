import { useMemo, useState } from 'react';

import type { IAppLayoutThemeFactory } from './AppLayout.css';
import type { IAppLayoutFactory } from './AppLayout.types';
import { isFunction } from '~/helpers/isFunction';
import { useDisclosure } from '~/hooks/useDisclosure';
import { useSideSheet } from '~/hooks/useSideSheet';
import { useWindowSizeClass } from '~/hooks/useWindowSizeClass';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { AppLayoutBody } from '../AppLayoutBody/AppLayoutBody';
import { AppLayoutFooter } from '../AppLayoutFooter';
import { AppLayoutHeader } from '../AppLayoutHeader';
import { AppLayoutPane } from '../AppLayoutPane';
import { AppLayoutSideSheet } from '../AppLayoutSideSheet';
import { Box } from '../Box';
import { themeTokens } from '../ThemeProvider';
import { AppLayoutProvider, IAppLayoutContextValue } from './AppLayout.context';
import { resolveNavigationMode } from './resolveNavigationMode';
import { appLayoutTheme } from './AppLayout.css';

const COMPONENT_NAME = 'AppLayout';

export const AppLayout = componentFactory<IAppLayoutFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      window: windowProp,
      navigationDrawer,
      aside,
      preferredNavigationMode = 'standard',
      components,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

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

    const { getStyles } = useComponentTheme<IAppLayoutThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutTheme,
    });

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

    // FIXME:
    const xxx = `:root { background-color: ${themeTokens.colorScheme.surface}; }`;

    return (
      <AppLayoutProvider value={contextValue}>
        <style type="text/css" dangerouslySetInnerHTML={{ __html: xxx }} />
        <Box {...getStyles('root')} ref={forwardedRef} {...other}>
          <div ref={setRootElement} />
          {isFunction(children) ? children(contextValue) : children}
        </Box>
      </AppLayoutProvider>
    );
  },
);

AppLayout.theme = appLayoutTheme;
AppLayout.displayName = `@sixui/${COMPONENT_NAME}`;
AppLayout.Header = AppLayoutHeader;
AppLayout.Body = AppLayoutBody;
AppLayout.SideSheet = AppLayoutSideSheet;
AppLayout.Pane = AppLayoutPane;
AppLayout.Footer = AppLayoutFooter;
