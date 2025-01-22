import type { IAppLayoutSideSheetThemeFactory } from './AppLayoutSideSheet.css';
import type { IAppLayoutSideSheetFactory } from './AppLayoutSideSheet.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { Box } from '../Box';
import { appLayoutSideSheetTheme } from './AppLayoutSideSheet.css';

const COMPONENT_NAME = 'AppLayoutSideSheet';

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
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();

    const hasHeader =
      hasHeaderProp ?? appLayoutContext?.components.includes('header');

    const hasNavigationRail =
      navigationRailOpenedProp ??
      appLayoutContext?.components.includes('navigationRail');
    const navigationRailOpened =
      navigationRailOpenedProp ??
      (hasNavigationRail &&
        (appLayoutContext?.navigationMode === 'rail' || !appLayoutContext));

    const hasNavigationDrawer =
      navigationDrawerOpenedProp ??
      appLayoutContext?.components.includes('navigationDrawer');
    const standardNavigationDrawerOpened =
      navigationDrawerOpenedProp ??
      (hasNavigationDrawer &&
        ((appLayoutContext?.navigationMode === 'standard' &&
          appLayoutContext?.navigationDrawer?.state?.standardOpened) ||
          !appLayoutContext));

    const hasAside =
      asideOpenedProp ?? appLayoutContext?.components.includes('aside');
    const standardAsideOpened =
      asideOpenedProp ??
      (hasAside &&
        (appLayoutContext?.aside?.state?.standardOpened || !appLayoutContext));

    const isRightSide = side === 'right';
    const isLeftSide = !isRightSide;

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
        'navigation-rail-opened': isLeftSide && navigationRailOpened,
        'navigation-drawer-opened':
          isLeftSide && standardNavigationDrawerOpened,
        'aside-opened': isRightSide && standardAsideOpened,
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
