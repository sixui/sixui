import type { ICardMediaThemeFactory } from './CardMedia.css';
import type { ICardMediaFactory } from './CardMedia.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './CardMedia.constants';
import { cardMediaTheme } from './CardMedia.css';

export const CardMedia = componentFactory<ICardMediaFactory>(
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
      <Box
        {...getStyles('root', {
          style: {
            backgroundImage: src ? `url(${src})` : undefined,
          },
        })}
        role="img"
        ref={forwardedRef}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

CardMedia.theme = cardMediaTheme;
CardMedia.displayName = `@sixui/core/${COMPONENT_NAME}`;
