import type { ICardMediaThemeFactory } from './CardMedia.css';
import type { ICardMediaFactory } from './CardMedia.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component';
import { COMPONENT_NAME } from './CardMedia.constants';
import { cardMediaTheme } from './CardMedia.css';

/**
 * @see https://m3.material.io/components/cards/overview
 */
export const CardMedia = polymorphicComponentFactory<ICardMediaFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      src,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ICardMediaThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: cardMediaTheme,
      modifiers: {
        type: 'image',
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        <div
          role="img"
          {...getStyles('content', {
            style: {
              backgroundImage: src ? `url(${src})` : undefined,
            },
          })}
        >
          {children}
        </div>
      </Box>
    );
  },
);

CardMedia.displayName = `@sixui/core/${COMPONENT_NAME}`;
CardMedia.theme = cardMediaTheme;
