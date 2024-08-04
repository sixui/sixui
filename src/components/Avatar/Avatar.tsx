import { forwardRef, useMemo } from 'react';

import type { IAvatarProps } from './Avatar.types';
import { useStyles } from '~/hooks/useStyles';
import { useImageLoaded } from '~/hooks/useImageLoaded';
import { hslColorFromString } from '~/helpers/colors/hslColorFromString';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { Base } from '../Base';
import { avatarStyles, avatarDynamicStyles } from './Avatar.styles';
import { avatarTheme } from './Avatar.stylex';
import { avatarVariantStyles } from './variants';

export const Avatar = createPolymorphicComponent<'div', IAvatarProps>(
  forwardRef<HTMLDivElement, IAvatarProps>(
    function Avatar(props, forwardedRef) {
      const {
        styles,
        sx,
        alt,
        crossOrigin,
        referrerPolicy,
        src,
        srcSet,
        sizes,
        children,
        fallbackToRandomColor,
        randomColorSourceString: randomColorSourceStringProp,
        variant = 'rounded',
        ...other
      } = props;

      const { combineStyles, getStyles, globalStyles } = useStyles({
        name: 'Avatar',
        styles: [avatarStyles, avatarVariantStyles[variant], styles],
      });

      // Use a hook instead of onError on the img element to support server-side
      // rendering.
      const { hasLoadingError } = useImageLoaded({
        crossOrigin,
        referrerPolicy,
        src,
        srcSet,
      });
      const hasImage = !!src || !!srcSet;
      const hasImageNotFailing = hasImage && !hasLoadingError;

      const randomColorSourceString =
        randomColorSourceStringProp ??
        (typeof children === 'string' ? children : undefined) ??
        alt ??
        src;
      const randomColor = useMemo(
        () =>
          fallbackToRandomColor && randomColorSourceString
            ? hslColorFromString(randomColorSourceString)
            : undefined,
        [fallbackToRandomColor, randomColorSourceString],
      );

      return (
        <Base
          {...other}
          sx={[
            avatarTheme,
            globalStyles,
            randomColor
              ? avatarDynamicStyles.backgroundColor(randomColor)
              : undefined,
            combineStyles('host'),
            sx,
          ]}
          ref={forwardedRef}
        >
          {hasImageNotFailing ? (
            <img
              {...getStyles('image')}
              alt={alt}
              crossOrigin={crossOrigin}
              referrerPolicy={referrerPolicy}
              src={src}
              srcSet={srcSet}
              sizes={sizes}
            />
          ) : children ? (
            <div {...getStyles('content')}>{children}</div>
          ) : hasImage && !!alt ? (
            <div {...getStyles('content')}>{alt[0]}</div>
          ) : null}
        </Base>
      );
    },
  ),
);
