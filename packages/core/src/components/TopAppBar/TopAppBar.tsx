import type { ITopAppBarThemeFactory } from './TopAppBar.css';
import type { ITopAppBarFactory } from './TopAppBar.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './TopAppBar.constants';
import { topAppBarTheme, topAppBarThemeVariants } from './TopAppBar.css';

export const TopAppBar = componentFactory<ITopAppBarFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      headline,
      leadingNavigation,
      trailingActions,
      trailingActionsCountBeforeCollapse = 3,
      scrolling,
      hidden,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ITopAppBarThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: topAppBarTheme,
      themeVariants: topAppBarThemeVariants,
    });

    return (
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        XXX
      </Paper>
    );
  },
);

TopAppBar.theme = topAppBarTheme;
TopAppBar.displayName = `@sixui/core/${COMPONENT_NAME}`;
