import type { INavigationBarDestinationFactory } from './NavigationBarDestination.types';
import { NavigationRailDestination } from '~/components/NavigationRail/NavigationRailDestination';
import { useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './NavigationBarDestination.constants';
import { navigationBarDestinationTheme } from './NavigationBarDestination.css';

/**
 * @see https://m3.material.io/components/navigation-bar/overview
 */
export const NavigationBarDestination =
  polymorphicComponentFactory<INavigationBarDestinationFactory>(
    (props, forwardedRef) => {
      const { ...other } = useProps({ componentName: COMPONENT_NAME, props });

      return <NavigationRailDestination ref={forwardedRef} {...other} />;
    },
  );

NavigationBarDestination.displayName = `@sixui/core/${COMPONENT_NAME}`;
NavigationBarDestination.theme = navigationBarDestinationTheme;
