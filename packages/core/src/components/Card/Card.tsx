import type { ICardThemeFactory } from './Card.css';
import type { ICardFactory } from './Card.types';
import { ButtonBase } from '~/components/ButtonBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './Card.constants';
import { CardActions } from './CardActions';
import { CardContent } from './CardContent';
import { CardMedia } from './CardMedia';
import { CardTitle } from './CardTitle';
import { cardTheme, cardThemeVariants } from './Card.css';

/**
 * @see https://m3.material.io/components/cards/overview
 */
export const Card = polymorphicComponentFactory<ICardFactory>(
  (props, forwardedRef) => {
    const {
      as,
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

    const rootElement = as ?? (other.href ? undefined : 'div');
    const interactive =
      !!other.href ||
      !!other.onClick ||
      (other as React.HTMLAttributes<HTMLElement>).draggable;

    return (
      <ButtonBase
        {...getStyles('root')}
        as={rootElement}
        ref={forwardedRef}
        touchTargetRenderer={null}
        nonInteractive={!interactive}
        {...other}
      >
        {children}
      </ButtonBase>
    );
  },
);

Card.displayName = `@sixui/core/${COMPONENT_NAME}`;
Card.theme = cardTheme;
Card.Content = CardContent;
Card.Title = CardTitle;
Card.Media = CardMedia;
Card.Actions = CardActions;
