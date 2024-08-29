import { useMemo } from 'react';

import type { IAvatarFactory } from './Avatar.types';
import { polymorphicComponentFactory } from '~/utils/polymorphicComponentFactory';
import { useProps } from '~/hooks/useProps';
import { useStyles } from '~/hooks/useStyles2';
import { useImageLoaded } from '~/hooks/useImageLoaded';
import { hslColorFromString } from '~/helpers/colors/hslColorFromString';
import { getHslColor } from '~/helpers/styles/getHslColor';
import { Box } from '../Box';
import { avatarStyles, type IAvatarStylesFactory } from './Avatar.css';

const COMPONENT_NAME = 'Avatar';

export const Avatar = polymorphicComponentFactory<IAvatarFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      style,
      alt,
      src,
      slotProps,
      children,
      fallbackToRandomColor,
      randomColorSourceString: randomColorSourceStringProp,
      variant = 'rounded',
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useStyles<IAvatarStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: avatarStyles,
      style,
      variant,
    });

    // Use a hook instead of onError on the img element to support server-side
    // rendering.
    const { hasLoadingError } = useImageLoaded({
      src,
      ...slotProps?.img,
    });
    const hasImage = !!src || !!slotProps?.img?.src || !!slotProps?.img?.srcSet;
    const hasImageNotFailing = hasImage && !hasLoadingError;

    const randomColorSourceString =
      randomColorSourceStringProp ??
      (typeof children === 'string' ? children : undefined) ??
      alt ??
      src;
    const randomColorHsl = useMemo(
      () =>
        fallbackToRandomColor && randomColorSourceString
          ? hslColorFromString(randomColorSourceString)
          : undefined,
      [fallbackToRandomColor, randomColorSourceString],
    );

    return (
      <Box
        {...other}
        {...getStyles('root', {
          style: randomColorHsl
            ? {
                backgroundColor: getHslColor(randomColorHsl),
                color: '#000',
              }
            : undefined,
        })}
        ref={forwardedRef}
      >
        {hasImageNotFailing ? (
          <img
            {...getStyles('image')}
            src={src}
            alt={alt}
            {...slotProps?.img}
          />
        ) : children ? (
          <div {...getStyles('placeholder')}>{children}</div>
        ) : hasImage && !!alt ? (
          <div {...getStyles('placeholder')}>{alt[0]}</div>
        ) : null}
      </Box>
    );
  },
);

Avatar.styles = avatarStyles;
Avatar.displayName = `@sixui/${COMPONENT_NAME}`;
