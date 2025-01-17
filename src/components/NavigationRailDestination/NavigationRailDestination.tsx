import type { INavigationRailDestinationThemeFactory } from './NavigationRailDestination.css';
import type { INavigationRailDestinationFactory } from './NavigationRailDestination.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Button } from '../Button';
import { navigationRailDestinationTheme } from './NavigationRailDestination.css';

const COMPONENT_NAME = 'NavigationRailDestination';

export const NavigationRailDestination =
  polymorphicComponentFactory<INavigationRailDestinationFactory>(
    (props, forwardedRef) => {
      const {
        classNames,
        className,
        styles,
        style,
        variant,
        children,
        disabled,
        ...other
      } = useProps({ componentName: COMPONENT_NAME, props });

      const { getStyles } =
        useComponentTheme<INavigationRailDestinationThemeFactory>({
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles,
          style,
          variant,
          theme: navigationRailDestinationTheme,
          modifiers: {
            disabled,
          },
        });

      return (
        <Button {...getStyles('root')} ref={forwardedRef} {...other}>
          {children}
        </Button>
      );
    },
  );

NavigationRailDestination.theme = navigationRailDestinationTheme;
NavigationRailDestination.displayName = `@sixui/${COMPONENT_NAME}`;
