import type { ICardContentThemeFactory } from './CardContent.css';
import type { ICardContentFactory } from './CardContent.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './CardContent.constants';
import { CardContentTheme } from './CardContent.css';

/**
 * @see https://m3.material.io/components/cards/overview
 */
export const CardContent = polymorphicComponentFactory<ICardContentFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ICardContentThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: CardContentTheme,
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Box>
    );
  },
);

CardContent.theme = CardContentTheme;
CardContent.displayName = `@sixui/core/${COMPONENT_NAME}`;
