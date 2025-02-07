import type { IAppLayoutNavigationRailThemeFactory } from './AppLayoutNavigationRail.css';
import type { IAppLayoutNavigationRailFactory } from './AppLayoutNavigationRail.types';
import { useAppLayoutContext } from '~/components/AppLayout/AppLayout.context';
import { Burger } from '~/components/Burger';
import { NavigationRail } from '~/components/NavigationRail';
import { NavigationRailDestination } from '~/components/NavigationRail/NavigationRailDestination';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { useAppLayoutComponent } from '../hooks/useAppLayoutComponent';
import { COMPONENT_NAME } from './AppLayoutNavigationRail.constants';
import { appLayoutNavigationRailTheme } from './AppLayoutNavigationRail.css';

export const AppLayoutNavigationRail =
  componentFactory<IAppLayoutNavigationRailFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      hasTopBar: hasTopBarProp,
      hasNavigationDrawer: hasNavigationDrawerProp,
      opened: openedProp,
      wide,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();
    useAppLayoutComponent('navigationRail');

    const hasTopBar =
      hasTopBarProp ?? appLayoutContext?.components.includes('topBar');
    const hasNavigationDrawer =
      hasNavigationDrawerProp ??
      appLayoutContext?.components.includes('navigationDrawer');

    const { getStyles } =
      useComponentTheme<IAppLayoutNavigationRailThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: appLayoutNavigationRailTheme,
        modifiers: {
          'with-top-bar': hasTopBar,
        },
      });

    const hasAppLayoutNavigationRail =
      appLayoutContext?.components.includes('navigationRail') ?? true;
    if (!hasAppLayoutNavigationRail) {
      return null;
    }

    const opened = openedProp ?? appLayoutContext?.navigationMode === 'rail';
    const showMenuIcon = (wide || !hasTopBar) && hasNavigationDrawer;

    return (
      <NavigationRail
        {...getStyles('root')}
        opened={opened}
        ref={forwardedRef}
        menuIcon={
          showMenuIcon && (
            <Burger
              onClick={appLayoutContext?.navigationDrawer?.state?.toggle}
            />
          )
        }
        wide={wide}
        {...other}
      />
    );
  });

AppLayoutNavigationRail.theme = appLayoutNavigationRailTheme;
AppLayoutNavigationRail.displayName = `@sixui/core/${COMPONENT_NAME}`;
AppLayoutNavigationRail.Destination = NavigationRailDestination;
