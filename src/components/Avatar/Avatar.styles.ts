import stylex from '@stylexjs/stylex';

import type { IHslColor } from '~/helpers/types';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { avatarTokens } from './Avatar.stylex';

const MIN_DENSITY = -3;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

export type IAvatarStylesKey = keyof typeof avatarStyles;
export const avatarStyles = stylex.create({
  host: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `calc(${avatarTokens.containerSize} * ${scaleTokens.scale} + ${DENSITY})`,
    height: `calc(${avatarTokens.containerSize} * ${scaleTokens.scale} + ${DENSITY})`,
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
});

export const avatarDynamicStyles = stylex.create({
  backgroundColor: (backgroundColor: IHslColor) => ({
    backgroundColor: `hsl(${backgroundColor.hue % 360}, ${backgroundColor.saturation}%, ${backgroundColor.lightness}%)`,
    color: '#000',
  }),
});
