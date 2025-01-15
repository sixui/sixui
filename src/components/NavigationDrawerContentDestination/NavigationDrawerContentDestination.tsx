import type { INavigationDrawerContentDestinationThemeFactory } from './NavigationDrawerContentDestination.css';
import type { INavigationDrawerContentDestinationFactory } from './NavigationDrawerContentDestination.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { navigationDrawerContentDestinationTheme } from './NavigationDrawerContentDestination.css';

const COMPONENT_NAME = 'NavigationDrawerContentDestination';

export const NavigationDrawerContentDestination =
  componentFactory<INavigationDrawerContentDestinationFactory>(
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
        useComponentTheme<INavigationDrawerContentDestinationThemeFactory>({
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles,
          style,
          variant,
          theme: navigationDrawerContentDestinationTheme,
          modifiers: {
            disabled,
          },
        });

      return (
        <Box {...getStyles('root')} ref={forwardedRef} {...other}>
          {children}
        </Box>
      );
    },
  );

NavigationDrawerContentDestination.theme =
  navigationDrawerContentDestinationTheme;
NavigationDrawerContentDestination.displayName = `@sixui/${COMPONENT_NAME}`;
