import type { INavigationBarDestinationThemeFactory } from './NavigationBarDestination.css';
import type { INavigationBarDestinationFactory } from './NavigationBarDestination.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Paper } from '../Paper';
import { navigationBarDestinationTheme } from './NavigationBarDestination.css';

const COMPONENT_NAME = 'NavigationBarDestination';

export const NavigationBarDestination =
  componentFactory<INavigationBarDestinationFactory>((props, forwardedRef) => {
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
      useComponentTheme<INavigationBarDestinationThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: navigationBarDestinationTheme,
        modifiers: {
          disabled,
        },
      });

    return (
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('label')}>{children}</div>
      </Paper>
    );
  });

NavigationBarDestination.theme = navigationBarDestinationTheme;
NavigationBarDestination.displayName = `@sixui/${COMPONENT_NAME}`;
