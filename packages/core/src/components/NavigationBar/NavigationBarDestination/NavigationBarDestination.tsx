import type { INavigationBarDestinationThemeFactory } from './NavigationBarDestination.css';
import type { INavigationBarDestinationFactory } from './NavigationBarDestination.types';
import { NavigationRailDestination } from '~/components/NavigationRail/NavigationRailDestination';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { navigationBarDestinationTheme } from './NavigationBarDestination.css';

const COMPONENT_NAME = 'NavigationBarDestination';

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
NavigationBarDestination.displayName = `@sixui/${COMPONENT_NAME}`;
