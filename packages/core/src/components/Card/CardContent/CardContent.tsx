import type { ICardContentThemeFactory } from './CardContent.css';
import type { ICardContentFactory } from './CardContent.types';
import { Box } from '~/components/Box';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { CardContentTheme } from './CardContent.css';

const COMPONENT_NAME = 'CardContent';

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
CardContent.displayName = `@sixui/${COMPONENT_NAME}`;
