import { useMemo } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IAvatarThemeFactory } from './Avatar.css';
import type { IAvatarFactory } from './Avatar.types';
import { Paper } from '~/components/Paper';
import { hslColorFromString } from '~/helpers/colors/hslColorFromString';
import { getHslColor } from '~/helpers/styles/getHslColor';
import { useImageLoaded } from '~/hooks/useImageLoaded';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeProps } from '~/utils/mergeProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { paperBaseTheme } from '~/components/PaperBase/PaperBase.css';
import { avatarTheme } from './Avatar.css';

const COMPONENT_NAME = 'Avatar';

export const Avatar = polymorphicComponentFactory<IAvatarFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      alt,
      src,
      imgProps,
      children,
      fallbackToRandomColor,
      randomColorSourceString: randomColorSourceStringProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IAvatarThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: avatarTheme,
    });

    // Use a hook instead of onError on the img element to support server-side
    // rendering.
    const { hasLoadingError } = useImageLoaded({
      src,
      ...imgProps,
    });
    const hasImage = !!src || !!imgProps?.src || !!imgProps?.srcSet;
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
      <Paper
        {...getStyles('root', {
          style: randomColorHsl
            ? {
                ...assignInlineVars({
                  [paperBaseTheme.tokens.container.color.normal]:
                    getHslColor(randomColorHsl),
                }),
                color: '#000',
              }
            : undefined,
        })}
        classNames={classNames}
        ref={forwardedRef}
        {...other}
      >
        {hasImageNotFailing ? (
          <img
            src={src}
            alt={alt}
            {...mergeProps(getStyles('image'), imgProps)}
          />
        ) : children ? (
          <div {...getStyles('placeholder')}>{children}</div>
        ) : hasImage && !!alt ? (
          <div {...getStyles('placeholder')}>{alt[0]}</div>
        ) : null}
      </Paper>
    );
  },
);

Avatar.theme = avatarTheme;
Avatar.displayName = `@sixui/${COMPONENT_NAME}`;
