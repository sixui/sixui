import type { INavigationDrawerThemeFactory } from './NavigationDrawer.css';
import type { INavigationDrawerFactory } from './NavigationDrawer.types';
import { SideSheet } from '~/components/SideSheet';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './NavigationDrawer.constants';
import { NavigationDrawerDestination } from './NavigationDrawerDestination';
import { NavigationDrawerSection } from './NavigationDrawerSection';
import { navigationDrawerTheme } from './NavigationDrawer.css';

export const NavigationDrawer = componentFactory<INavigationDrawerFactory>(
  (props, forwardedRef) => {
    const { classNames, className, styles, style, variant, ...other } =
      useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<INavigationDrawerThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: navigationDrawerTheme,
    });

    return (
      <SideSheet
        {...getStyles('root')}
        classNames={classNames}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

NavigationDrawer.theme = navigationDrawerTheme;
NavigationDrawer.displayName = `@sixui/core/${COMPONENT_NAME}`;
NavigationDrawer.Section = NavigationDrawerSection;
NavigationDrawer.Destination = NavigationDrawerDestination;
