import { forwardRef, useMemo } from 'react';

import type { IAvatarProps } from './Avatar.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { useLoaded } from '~/hooks/useLoaded';
import { hslColorFromString } from '~/helpers/colors/hslColorFromString';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { Base } from '~/components/Base';
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

      const componentTheme = useComponentTheme('Avatar');
      const variantStyles = variant ? avatarVariantStyles[variant] : undefined;

      const stylesCombinator = useMemo(
        () => stylesCombinatorFactory(avatarStyles, variantStyles, styles),
        [variantStyles, styles],
      );
      const sxf = useMemo(
        () => stylePropsFactory(stylesCombinator),
        [stylesCombinator],
      );

      // Use a hook instead of onError on the img element to support server-side rendering.
      const { hasLoadingError } = useLoaded({
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
          component='div'
          {...other}
          sx={stylesCombinator(
            avatarTheme,
            componentTheme.overridenStyles,
            'host',
            randomColor
              ? avatarDynamicStyles.backgroundColor(randomColor)
              : undefined,
            sx,
          )}
          ref={forwardedRef}
        >
          {hasImageNotFailing ? (
            <img
              {...sxf('image')}
              alt={alt}
              crossOrigin={crossOrigin}
              referrerPolicy={referrerPolicy}
              src={src}
              srcSet={srcSet}
              sizes={sizes}
            />
          ) : children ? (
            <div {...sxf('content')}>{children}</div>
          ) : hasImage && !!alt ? (
            <div {...sxf('content')}>{alt[0]}</div>
          ) : null}
        </Base>
      );
    },
  ),
);
