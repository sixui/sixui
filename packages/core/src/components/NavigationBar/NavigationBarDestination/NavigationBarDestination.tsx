import type { INavigationBarDestinationThemeFactory } from './NavigationBarDestination.css';
import type { INavigationBarDestinationFactory } from './NavigationBarDestination.types';
import { NavigationRailDestination } from '~/components/NavigationRail/NavigationRailDestination';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './NavigationBarDestination.constants';
import { navigationBarDestinationTheme } from './NavigationBarDestination.css';

export const NavigationBarDestination =
  polymorphicComponentFactory<INavigationBarDestinationFactory>(
    (props, forwardedRef) => {
      const { classNames, className, styles, style, variant, ...other } =
        useProps({ componentName: COMPONENT_NAME, props });

      const { getStyles } =
        useComponentTheme<INavigationBarDestinationThemeFactory>({
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles,
          style,
          variant,
          theme: navigationBarDestinationTheme,
        });

      return (
        <NavigationRailDestination
          {...getStyles('root')}
          ref={forwardedRef}
          {...other}
        />
      );
    },
  );

NavigationBarDestination.theme = navigationBarDestinationTheme;
NavigationBarDestination.displayName = `@sixui/core/${COMPONENT_NAME}`;
