import type { ICardThemeFactory } from './Card.css';
import type { ICardFactory } from './Card.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ButtonBase } from '../ButtonBase';
import { cardTheme, cardThemeVariants } from './Card.css';

const COMPONENT_NAME = 'Card';

export const Card = polymorphicComponentFactory<ICardFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'filled',
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
      <ButtonBase {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </ButtonBase>
    );
  },
);

Card.theme = cardTheme;
Card.displayName = `@sixui/${COMPONENT_NAME}`;
