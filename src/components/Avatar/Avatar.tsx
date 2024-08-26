import { forwardRef, useMemo } from 'react';

import type { IAvatarProps } from './Avatar.types';
import type { IHslColor } from '~/helpers/types';
import { useStyles } from '~/hooks/useStyles2';
import { useImageLoaded } from '~/hooks/useImageLoaded';
import { hslColorFromString } from '~/helpers/colors/hslColorFromString';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { Box } from '../Box';
import { avatarTheme, avatarStyles, avatarVariants } from './Avatar.css';

// TODO: -> helper
const hslToCss = (hsl: IHslColor): string =>
  `hsl(${hsl.hue % 360}, ${hsl.saturation}%, ${hsl.lightness}%)`;

export const Avatar = createPolymorphicComponent<'div', IAvatarProps>(
  forwardRef<HTMLDivElement, IAvatarProps>(
    function Avatar(props, forwardedRef) {
      const {
        className,
        style,
        classNames,
        alt,
        src,
        slotProps,
        children,
        fallbackToRandomColor,
        randomColorSourceString: randomColorSourceStringProp,
        variant = 'rounded',
        ...other
      } = props;

      const { getStyles } = useStyles({
        name: 'Avatar',
        className,
        style,
        classNames,
        styles: avatarStyles,
        theme: avatarTheme,
        variants: avatarVariants,
        variant,
      });

      // Use a hook instead of onError on the img element to support server-side
      // rendering.
      const { hasLoadingError } = useImageLoaded({
        src,
        ...slotProps?.img,
      });
      const hasImage =
        !!src || !!slotProps?.img?.src || !!slotProps?.img?.srcSet;
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
                  backgroundColor: hslToCss(randomColorHsl),
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
  ),
);
