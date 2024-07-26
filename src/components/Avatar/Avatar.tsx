import { forwardRef, useMemo } from 'react';

import type { IAvatarProps } from './Avatar.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { useLoaded } from '~/hooks/useLoaded';
import { SvgIcon } from '~/components/SvgIcon';
import { iconAvatarPlaceholder } from '~/assets/icons';
import { avatarStyles } from './Avatar.styles';
import { avatarTheme } from './Avatar.stylex';

export const Avatar = forwardRef<HTMLDivElement, IAvatarProps>(
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
      ...other
    } = props;

    const componentTheme = useComponentTheme('Avatar');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(avatarStyles, styles),
      [styles],
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

    return (
      <div
        {...sxf(avatarTheme, componentTheme.overridenStyles, 'host', sx)}
        {...other}
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
        ) : (
          <SvgIcon
            sx={[
              stylesCombinator('content'),
              stylesCombinator('content$fallback'),
            ]}
            icon={iconAvatarPlaceholder}
          />
        )}
      </div>
    );
  },
);
