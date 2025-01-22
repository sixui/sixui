import type { IAppLayoutSideSheetThemeFactory } from './AppLayoutSideSheet.css';
import type { IAppLayoutSideSheetFactory } from './AppLayoutSideSheet.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { Box } from '../Box';
import { appLayoutSideSheetTheme } from './AppLayoutSideSheet.css';

const COMPONENT_NAME = 'AppLayoutSideSheet';

// FIXME: usage?

export const AppLayoutSideSheet = componentFactory<IAppLayoutSideSheetFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      fullHeight,
      side = 'left',
      hasHeader: hasHeaderProp,
      navigationRailOpened: navigationRailOpenedProp,
      navigationDrawerOpened: navigationDrawerOpenedProp,
      asideOpened: asideOpenedProp,
      opened: openedProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();

    const hasHeader =
      hasHeaderProp ?? appLayoutContext?.components.includes('header');

    const isRightSide = side === 'right';
    const isLeftSide = !isRightSide;

    const hasNavigationRail =
      navigationRailOpenedProp ??
      appLayoutContext?.components.includes('navigationRail');
    const navigationRailOpened =
      isLeftSide &&
      hasNavigationRail &&
      (appLayoutContext?.navigationMode === 'rail' || !appLayoutContext);

    const hasNavigationDrawer =
      navigationDrawerOpenedProp ??
      appLayoutContext?.components.includes('navigationDrawer');
    const navigationDrawerOpened =
      hasNavigationDrawer &&
      isLeftSide &&
      ((appLayoutContext?.navigationMode === 'standard' &&
        appLayoutContext?.navigationDrawer?.state?.standardOpened) ||
        !appLayoutContext);

    const hasAside =
      asideOpenedProp ?? appLayoutContext?.components.includes('aside');
    const asideOpened =
      hasAside &&
      isRightSide &&
      (appLayoutContext?.aside?.state?.standardOpened || !appLayoutContext);

    const opened =
      openedProp ??
      (navigationRailOpened || navigationDrawerOpened || asideOpened);

    const { getStyles } = useComponentTheme<IAppLayoutSideSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutSideSheetTheme,
      modifiers: {
        'full-height': fullHeight,
        'with-header': hasHeader,
        'navigation-rail': isLeftSide && navigationRailOpened,
        'navigation-drawer': isLeftSide && navigationDrawerOpened,
        aside: isRightSide && asideOpened,
        opened,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('inner')}>{children}</div>
      </Box>
    );
  },
);

AppLayoutSideSheet.theme = appLayoutSideSheetTheme;
AppLayoutSideSheet.displayName = `@sixui/${COMPONENT_NAME}`;
