import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { IAvatarStyleKey, IAvatarStyleVarKey } from './Avatar.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useLoaded } from '@/hooks/useLoaded';
import { ReactComponent as PersonIcon } from '@/assets/Person.svg';

export type IAvatarProps = IContainerProps<IAvatarStyleKey> &
  Pick<
    React.ImgHTMLAttributes<HTMLImageElement>,
    'alt' | 'crossOrigin' | 'referrerPolicy' | 'src' | 'srcSet' | 'sizes'
  > & {
    /**
     * Used to render icon or text elements inside the Avatar if `src` is not set. This can be an
     * element, or just a string.
     */
    children?: React.ReactNode;
  };

export const Avatar = forwardRef<HTMLDivElement, IAvatarProps>(
  function Avatar(props, ref) {
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

    const { theme } = useComponentTheme('Avatar');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IAvatarStyleKey, IAvatarStyleVarKey>(
          stylesCombinator,
        ),
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
      <div {...sxf('host', theme.vars, sx)} ref={ref} {...other}>
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
          <PersonIcon {...sxf('content', 'content$fallback')} aria-hidden />
        )}
      </div>
    );
  },
);
