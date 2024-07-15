import stylex from '@stylexjs/stylex';

import { motionTokens } from '@/themes/base/motion.stylex';
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
    minWidth: badgeTokens.containerMinWidth,
    height: badgeTokens.containerHeight,
    padding: badgeTokens.containerPadding,
    transitionProperty: 'transform',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasized,
  },
  background: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    backgroundColor: badgeTokens.containerColor,
  },
  background$disabled: {
    backgroundColor: badgeTokens.containerColor$disabled,
    opacity: badgeTokens.containerOpacity$disabled,
  },
  host$dot: {
    borderRadius: badgeTokens.containerShape$dot,
    minWidth: badgeTokens.containerWidth$dot,
    height: badgeTokens.containerHeight$dot,
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
  label$disabled: {
    color: badgeTokens.labelTextColor$disabled,
    opacity: badgeTokens.labelTextOpacity$disabled,
  },
});
