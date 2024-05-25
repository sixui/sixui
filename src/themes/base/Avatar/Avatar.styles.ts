import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IAvatarStyleKey } from '@/components/atoms/Avatar';
import { componentVars as vars } from './Avatar.stylex';

type IAvatarStyles = IStyles<IAvatarStyleKey>;
export const styles: MapNamespaces<IAvatarStyles> =
  stylex.create<IAvatarStyles>({
    host: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: vars.containerWidth,
      height: vars.containerHeight,
      overflow: 'hidden',
      borderRadius: vars.containerShape,
      userSelect: 'none',
      backgroundColor: vars.containerColor,
      color: vars.labelTextColor,
      textTransform: 'uppercase',
      flexShrink: 0,
      flexGrow: 0,
    },
    image: {
      width: '100%',
      height: '100%',
      textAlign: 'center',
      // Handle non-square image. The property isn't supported by IE11.
      objectFit: 'cover',
      // Hide alt text.
      color: 'transparent',
      // Hide the image broken icon, only works on Chrome.
      textIndent: 10000,
    },
    content: {
      width: '70%',
      height: '70%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontFamily: vars.labelTextFont,
      lineHeight: vars.labelTextLineHeight,
      fontSize: vars.labelTextSize,
      letterSpacing: vars.labelTextLetterSpacing,
      fontWeight: vars.labelTextWeight,
    },
    content$fallback: {
      width: '100%',
      height: '100%',
    },
  });
