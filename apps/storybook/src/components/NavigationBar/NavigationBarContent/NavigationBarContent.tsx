import type { INavigationBarContentThemeFactory } from './NavigationBarContent.css';
import type { INavigationBarContentFactory } from './NavigationBarContent.types';
import { Paper } from '~/components/Paper';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { navigationBarContentTheme } from './NavigationBarContent.css';

const COMPONENT_NAME = 'NavigationBarContent';

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

NavigationBarContent.theme = navigationBarContentTheme;
NavigationBarContent.displayName = `@sixui/${COMPONENT_NAME}`;
