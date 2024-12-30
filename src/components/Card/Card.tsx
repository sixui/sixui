import type { ICardThemeFactory } from './Card.css';
import type { ICardFactory } from './Card.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { cardTheme, cardThemeVariants } from './Card.css';

const COMPONENT_NAME = 'Card';

export const Card = componentFactory<ICardFactory>((props, forwardedRef) => {
  const {
    classNames,
    className,
    styles,
    style,
    variant = 'primary',
    children,
    disabled,
    ...other
  } = useProps({ componentName: COMPONENT_NAME, props });

  const { getStyles } = useComponentTheme<ICardThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    variant,
    theme: cardTheme,
    themeVariants: cardThemeVariants,
    modifiers: {
      disabled,
    },
  });

  return (
    <Box {...getStyles('root')} ref={forwardedRef} {...other}>
      {children}
    </Box>
  );
});

Card.theme = cardTheme;
Card.displayName = `@sixui/${COMPONENT_NAME}`;
