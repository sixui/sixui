import type { IAppLayoutSideSheetThemeFactory } from './AppLayoutSideSheet.css';
import type { IAppLayoutSideSheetFactory } from './AppLayoutSideSheet.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { Paper } from '../Paper';
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
      hasNavigationRail: hasNavigationRailProp,
      hasNavigationDrawer: hasNavigationDrawerProp,
      hasAside: hasAsideProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();

    const hasHeader =
      hasHeaderProp ?? appLayoutContext?.components.includes('header');

    const hasNavigationRail =
      hasNavigationRailProp ??
      appLayoutContext?.components.includes('navigationRail');
    const navigationRailOpened =
      hasNavigationRail &&
      (appLayoutContext?.navigationMode === 'rail' || !appLayoutContext);

    const hasNavigationDrawer =
      hasNavigationDrawerProp ??
      appLayoutContext?.components.includes('navigationDrawer');
    const standardNavigationDrawerOpened =
      hasNavigationDrawer &&
      ((appLayoutContext?.navigationMode === 'standard' &&
        appLayoutContext?.navigationDrawer?.state?.standardOpened) ||
        !appLayoutContext);

    const hasAside =
      hasAsideProp ?? appLayoutContext?.components.includes('aside');
    const standardAsideOpened =
      hasAside &&
      (appLayoutContext?.aside?.state?.standardOpened || !appLayoutContext);

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
        'with-navigation-rail': isLeftSide && navigationRailOpened,
        'with-navigation-drawer': isLeftSide && standardNavigationDrawerOpened,
        'with-aside': isRightSide && standardAsideOpened,
      },
    });

    return (
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('inner')}>{children}</div>
      </Paper>
    );
  },
);

AppLayoutSideSheet.theme = appLayoutSideSheetTheme;
AppLayoutSideSheet.displayName = `@sixui/${COMPONENT_NAME}`;
