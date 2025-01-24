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
import { AppLayoutNavigationBar } from '../AppLayoutNavigationBar/AppLayoutNavigationBar';
import { AppLayoutNavigationDrawer } from '../AppLayoutNavigationDrawer';
import { AppLayoutNavigationRail } from '../AppLayoutNavigationRail';
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
      sideSheet,
      preferredNavigationMode = 'standard',
      components,
      pageBackgroundColor = themeTokens.colorScheme.surface,
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

    const [sideSheetOpened, sideSheetCallbacks] = useDisclosure(
      !sideSheet?.defaultClosed,
    );
    const sideSheetType = windowSizeClass?.extraLargeAndUp
      ? 'standard'
      : 'modal';
    const sideSheetState = useSideSheet({
      opened: sideSheetOpened,
      type: sideSheetType,
      onOpen: sideSheetCallbacks.open,
      onClose: sideSheetCallbacks.close,
    });
    const hasSideSheet = components.includes('sideSheet');

    const { getStyles } = useComponentTheme<IAppLayoutThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutTheme,
      modifiers: {
        'navigation-mode': navigationMode,
      },
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
        sideSheet: {
          ...sideSheet,
          state: hasSideSheet
            ? {
                opened: sideSheetOpened,
                type: sideSheetType,
                modalOpened: sideSheetState.modalOpened,
                standardOpened: sideSheetState.standardOpened,
                toggle: sideSheetCallbacks.toggle,
                open: sideSheetCallbacks.open,
                close: sideSheetCallbacks.close,
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
      sideSheet,
      hasSideSheet,
      sideSheetOpened,
      sideSheetType,
      sideSheetState.modalOpened,
      sideSheetState.standardOpened,
      sideSheetCallbacks.toggle,
      sideSheetCallbacks.open,
      sideSheetCallbacks.close,
    ]);

    const globalStyles = `:root { background-color: ${pageBackgroundColor}; }`;

    return (
      <AppLayoutProvider value={contextValue}>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: globalStyles }}
        />
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
AppLayout.NavigationBar = AppLayoutNavigationBar;
AppLayout.NavigationRail = AppLayoutNavigationRail;
AppLayout.NavigationDrawer = AppLayoutNavigationDrawer;
AppLayout.SideSheet = AppLayoutSideSheet;
AppLayout.Footer = AppLayoutFooter;
