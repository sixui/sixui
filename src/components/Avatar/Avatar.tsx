import { useMemo } from 'react';

import type { IAvatarProps } from './Avatar.types';
import { useStyles } from '~/hooks/useStyles2';
import { useImageLoaded } from '~/hooks/useImageLoaded';
import { hslColorFromString } from '~/helpers/colors/hslColorFromString';
import { getHslColor } from '~/helpers/styles/getHslColor';
import { Box } from '../Box';
import {
  polymorphicComponentFactory,
  type IPolymorphicComponentFactory,
} from '~/helpers/react/polymorphicComponentFactory';
import { avatarStyles, IAvatarStylesFactory } from './Avatar.css';
import { useProps } from '~/hooks/useProps';

export type IAvatarFactory = IPolymorphicComponentFactory<{
  props: IAvatarProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  styles: IAvatarStylesFactory;
}>;

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
    } = useProps({ componentName: 'Avatar', props });

    const { getStyles } = useStyles<IAvatarStylesFactory>({
      componentName: 'Avatar',
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
Avatar.displayName = '@sixui/Avatar';

// FIXME: test static components
