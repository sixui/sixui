import type { IBurgerThemeFactory } from './Burger.css';
import type { IBurgerFactory } from './Burger.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Burger.constants';
import { burgerTheme } from './Burger.css';

export const Burger = componentFactory<IBurgerFactory>(
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

    const { getStyles } = useComponentTheme<IBurgerThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: burgerTheme,
      modifiers: {
        disabled,
      },
    });

    return (
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('label')}>{children}</div>
      </Paper>
    );
  },
);

Burger.theme = burgerTheme;
Burger.displayName = `@sixui/${COMPONENT_NAME}`;
