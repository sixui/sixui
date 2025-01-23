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
      side = 'left',
      hasHeader: hasHeaderProp,
      navigationRailOpened: navigationRailOpenedProp,
      navigationDrawerOpened: navigationDrawerOpenedProp,
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

    const opened =
      openedProp ?? (navigationRailOpened || navigationDrawerOpened);

    const { getStyles } = useComponentTheme<IAppLayoutSideSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutSideSheetTheme,
      modifiers: {
        'with-header': hasHeader,
        'navigation-rail': isLeftSide && navigationRailOpened,
        'navigation-drawer': isLeftSide && navigationDrawerOpened,
        opened,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Box>
    );
  },
);

AppLayoutSideSheet.theme = appLayoutSideSheetTheme;
AppLayoutSideSheet.displayName = `@sixui/${COMPONENT_NAME}`;
