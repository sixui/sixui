import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { IAvatarStyleKey, IAvatarStyleVarKey } from './Avatar.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

import { ReactComponent as Person } from '@/assets/Person.svg';
import { useLoaded } from '@/hooks/useLoaded';

export interface IAvatarProps
  extends IContainer<IAvatarStyleKey, IAvatarStyleVarKey>,
    Pick<
      React.ImgHTMLAttributes<HTMLImageElement>,
      'alt' | 'crossOrigin' | 'referrerPolicy' | 'src' | 'srcSet' | 'sizes'
    > {
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set. This can be an
   * element, or just a string.
   */
  children?: React.ReactNode;
}

export const Avatar: React.FC<IAvatarProps> = ({
  alt,
  crossOrigin,
  referrerPolicy,
  src,
  srcSet,
  sizes,
  children,
  ...props
}) => {
  const theme = useComponentTheme('Avatar');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IAvatarStyleKey, IAvatarStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
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
    <div {...styleProps(['host'], [theme.vars, props.theme])}>
      {hasImageNotFailing ? (
        <img
          {...styleProps(['image'])}
          alt={alt}
          crossOrigin={crossOrigin}
          referrerPolicy={referrerPolicy}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
        />
      ) : children ? (
        <div {...styleProps(['content'])}>{children}</div>
      ) : hasImage && !!alt ? (
        <div {...styleProps(['content'])}>{alt[0]}</div>
      ) : (
        <Person {...styleProps(['content', 'content$fallback'])} aria-hidden />
      )}
    </div>
  );
};
