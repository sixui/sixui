import { useMemo, useState } from 'react';

import type { IAppLayoutThemeFactory } from './AppLayout.css';
import type {
  IAppLayoutComponentName,
  IAppLayoutFactory,
} from './AppLayout.types';
import type { IAppLayoutSetterContextValue } from './AppLayoutSetter.context';
import { Box } from '~/components/Box';
import { InlineStyles } from '~/components/InlineStyles';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useAfterHydration } from '~/hooks/useAfterHydration';
import { useDisclosure } from '~/hooks/useDisclosure';
import { useSet } from '~/hooks/useSet';
import { useSideSheet } from '~/hooks/useSideSheet';
import { useWindowSizeClass } from '~/hooks/useWindowSizeClass';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './AppLayout.constants';
import { AppLayoutProvider, IAppLayoutContextValue } from './AppLayout.context';
import { AppLayoutBody } from './AppLayoutBody';
import { AppLayoutFeedBody } from './AppLayoutFeedBody';
import { AppLayoutFooter } from './AppLayoutFooter';
import { AppLayoutListDetailBody } from './AppLayoutListDetailBody';
import { AppLayoutNavigationBar } from './AppLayoutNavigationBar';
import { AppLayoutNavigationDrawer } from './AppLayoutNavigationDrawer';
import { AppLayoutNavigationRail } from './AppLayoutNavigationRail';
import { AppLayoutSetterProvider } from './AppLayoutSetter.context';
import { AppLayoutSideSheet } from './AppLayoutSideSheet';
import { AppLayoutSupportingPaneBody } from './AppLayoutSupportingPaneBody';
import { AppLayoutTopBar } from './AppLayoutTopBar';
import { resolveNavigationMode } from './resolveNavigationMode';
import { appLayoutTheme } from './AppLayout.css';

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
      backgroundColor = themeTokens.colorScheme.surface,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const window = windowProp ?? globalThis.window;

    const componentsSet = useSet<IAppLayoutComponentName>([]);
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    const isAfterHydration = useAfterHydration();
    const windowSizeClass = useWindowSizeClass({
      window,
    });

    const navigationMode = isAfterHydration
      ? resolveNavigationMode(windowSizeClass, preferredNavigationMode)
      : preferredNavigationMode;
    const [navigationDrawerOpened, navigationDrawerCallbacks] = useDisclosure(
      !navigationDrawer?.defaultClosed,
    );
    const navigationDrawerType =
      navigationMode === 'standard' ? 'standard' : 'drawer';
    const navigationDrawerState = useSideSheet({
      opened: navigationDrawerOpened,
      type: navigationDrawerType,
      onOpen: navigationDrawerCallbacks.open,
      onClose: navigationDrawerCallbacks.close,
    });
    const hasNavigationDrawer = componentsSet.has('navigationDrawer');

    const [sideSheetOpened, sideSheetCallbacks] = useDisclosure(
      !sideSheet?.defaultClosed,
    );
    const sideSheetType = windowSizeClass?.extraLargeAndUp
      ? 'standard'
      : 'drawer';
    const sideSheetState = useSideSheet({
      opened: sideSheetOpened,
      type: sideSheetType,
      onOpen: sideSheetCallbacks.open,
      onClose: sideSheetCallbacks.close,
    });
    const hasSideSheet = componentsSet.has('sideSheet');

    const { getStyles } = useComponentTheme<IAppLayoutThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutTheme,
    });

    const contextValue: IAppLayoutContextValue = {
      window,
      root: rootElement,
      navigationDrawer: {
        ...navigationDrawer,
        state: {
          // Always provide state to prevent uncontrolled → controlled warnings
          // and ensure consistent props during hydration
          opened: hasNavigationDrawer ? navigationDrawerOpened : false,
          isDrawer: hasNavigationDrawer ? navigationDrawerState.modal : false,
          type: navigationDrawerType,
          toggle: navigationDrawerCallbacks.toggle,
          open: navigationDrawerCallbacks.open,
          close: navigationDrawerCallbacks.close,
        },
      },
      sideSheet: {
        ...sideSheet,
        state: {
          // Always provide state to prevent uncontrolled → controlled warnings
          // and ensure consistent props during hydration
          opened: hasSideSheet ? sideSheetOpened : false,
          isDrawer: hasSideSheet ? sideSheetState.modal : false,
          type: sideSheetType,
          toggle: sideSheetCallbacks.toggle,
          open: sideSheetCallbacks.open,
          close: sideSheetCallbacks.close,
        },
      },
      navigationMode,
      preferredNavigationMode,
      components: [...componentsSet.values()],
    };

    const setterContextValue = useMemo<IAppLayoutSetterContextValue>(
      () => ({
        registerComponent: (component) => {
          componentsSet.add(component);
        },
        unregisterComponent: (component) => {
          componentsSet.delete(component);
        },
      }),
      [componentsSet],
    );

    return (
      <AppLayoutProvider value={contextValue}>
        <AppLayoutSetterProvider value={setterContextValue}>
          <InlineStyles selector=":root" styles={{ backgroundColor }} />
          <Box
            {...getStyles('root', {
              modifiers: {
                'navigation-mode': navigationMode,
                'with-top-bar': componentsSet.has('topBar'),
              },
            })}
            ref={forwardedRef}
            {...other}
          >
            <div ref={setRootElement} />
            {isFunction(children) ? children(contextValue) : children}
          </Box>
        </AppLayoutSetterProvider>
      </AppLayoutProvider>
    );
  },
);

AppLayout.displayName = `@sixui/core/${COMPONENT_NAME}`;
AppLayout.theme = appLayoutTheme;
AppLayout.TopBar = AppLayoutTopBar;
AppLayout.Body = AppLayoutBody;
AppLayout.ListDetailBody = AppLayoutListDetailBody;
AppLayout.SupportingPaneBody = AppLayoutSupportingPaneBody;
AppLayout.FeedBody = AppLayoutFeedBody;
AppLayout.NavigationBar = AppLayoutNavigationBar;
AppLayout.NavigationRail = AppLayoutNavigationRail;
AppLayout.NavigationDrawer = AppLayoutNavigationDrawer;
AppLayout.SideSheet = AppLayoutSideSheet;
AppLayout.Footer = AppLayoutFooter;
