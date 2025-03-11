import type { INavigationBarContentThemeFactory } from './NavigationBarContent.css';
import type { INavigationBarContentFactory } from './NavigationBarContent.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './NavigationBarContent.constants';
import { navigationBarContentTheme } from './NavigationBarContent.css';

/**
 * @see https://m3.material.io/components/navigation-bar/overview
 */
export const NavigationBarContent =
  componentFactory<INavigationBarContentFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<INavigationBarContentThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: navigationBarContentTheme,
    });

    return (
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Paper>
    );
  });

NavigationBarContent.displayName = `@sixui/core/${COMPONENT_NAME}`;
NavigationBarContent.theme = navigationBarContentTheme;
