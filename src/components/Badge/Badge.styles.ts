import stylex from '@stylexjs/stylex';

import { motionTokens } from '~/themes/base/motion.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { badgeTokens } from './Badge.stylex';

export type IBadgeStylesKey = keyof typeof badgeStyles;
export const badgeStyles = stylex.create({
  host: {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderRadius: badgeTokens.containerShape,
    minWidth: `max(${badgeTokens.containerMinWidth}, calc(${badgeTokens.containerMinWidth} * ${scaleTokens.scale}))`,
    height: `max(${badgeTokens.containerHeight}, calc(${badgeTokens.containerHeight} * ${scaleTokens.scale}))`,
    padding: badgeTokens.containerPadding,
    transitionProperty: 'transform',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasized,
    whiteSpace: 'nowrap',
  },
  background: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    backgroundColor: badgeTokens.containerColor,
  },
  host$dot: {
    borderRadius: badgeTokens.containerShape$dot,
    transform: `scale(${badgeTokens.containerDotScaleX}, ${badgeTokens.containerDotScaleY})`,
    padding: 0,
  },
  host$invisible: {
    transform: 'scale(0)',
  },
  label: {
    position: 'relative',
    fontFamily: badgeTokens.labelTextFont,
    lineHeight: badgeTokens.labelTextLineHeight,
    fontSize: badgeTokens.labelTextSize,
    letterSpacing: badgeTokens.labelTextLetterSpacing,
    fontWeight: badgeTokens.labelTextWeight,
    color: badgeTokens.labelTextColor,
  },
});
