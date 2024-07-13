import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IAvatarStyleKey } from '@/components/atoms/Avatar';
import { avatarTokens } from './Avatar.stylex';

export const avatarStyles = stylex.create<IStyles<IAvatarStyleKey>>({
  host: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: avatarTokens.containerWidth,
    height: avatarTokens.containerHeight,
    overflow: 'hidden',
    borderRadius: avatarTokens.containerShape,
    userSelect: 'none',
    backgroundColor: avatarTokens.containerColor,
    color: avatarTokens.labelTextColor,
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
    fontFamily: avatarTokens.labelTextFont,
    lineHeight: avatarTokens.labelTextLineHeight,
    fontSize: avatarTokens.labelTextSize,
    letterSpacing: avatarTokens.labelTextLetterSpacing,
    fontWeight: avatarTokens.labelTextWeight,
  },
  content$fallback: {
    width: '100%',
    height: '100%',
  },
});
