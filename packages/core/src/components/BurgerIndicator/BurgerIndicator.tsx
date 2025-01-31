import type { IBurgerIndicatorThemeFactory } from './BurgerIndicator.css';
import type { IBurgerIndicatorFactory } from './BurgerIndicator.types';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
import { componentFactory } from '~/utils/component/componentFactory';
import { Box } from '../Box';
import { COMPONENT_NAME } from './BurgerIndicator.constants';
import { burgerIndicatorTheme } from './BurgerIndicator.css';

export const BurgerIndicator = componentFactory<IBurgerIndicatorFactory>(
  (props, forwardedRef) => {
    const { classNames, className, styles, style, variant, opened, ...other } =
      useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IBurgerIndicatorThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: burgerIndicatorTheme,
      modifiers: {
        opened,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('burger')} />
      </Box>
    );
  },
);

BurgerIndicator.theme = burgerIndicatorTheme;
BurgerIndicator.displayName = `@sixui/${COMPONENT_NAME}`;
