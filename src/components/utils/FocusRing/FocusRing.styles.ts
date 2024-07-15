import stylex from '@stylexjs/stylex';

import { motionTokens } from '@/themes/base/tokens/motion.stylex';
import { focusRingTokens } from './FocusRing.stylex';

// https://github.com/material-components/material-web/blob/main/focus/internal/_focus-ring.scss

const inwardGrowKeyframes = stylex.keyframes({
  '0%': { borderWidth: 0 },
  '100%': { borderWidth: focusRingTokens.activeWidth },
});

const inwardShrinkKeyframes = stylex.keyframes({
  '0%': { borderWidth: focusRingTokens.activeWidth },
});

const outwardGrowKeyframes = stylex.keyframes({
  '0%': { outlineWidth: 0 },
  '100%': { outlineWidth: focusRingTokens.activeWidth },
});

const outwardShrinkKeyframes = stylex.keyframes({
  '0%': { outlineWidth: focusRingTokens.activeWidth },
});

export type IFocusRingStylesKey = keyof typeof focusRingStyles;
export const focusRingStyles = stylex.create({
  host: {
    animationDelay: `0s, calc(${focusRingTokens.duration} * 0.25)`,
    animationDuration: `calc(${focusRingTokens.duration} * 0.25), calc(${focusRingTokens.duration} * 0.75)`,
    animationTimingFunction: motionTokens.easing$emphasized,
    color: focusRingTokens.color,
    display: 'none',
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 999,
  },
  host$visible: {
    display: 'flex',
  },
  host$outward: {
    animationName: `${outwardGrowKeyframes}, ${outwardShrinkKeyframes}`,
    borderRadius: `calc(${focusRingTokens.shape} + ${focusRingTokens.outwardOffset})`,
    inset: `calc(-1 * ${focusRingTokens.outwardOffset})`,
    outline: `${focusRingTokens.width} solid currentColor`,
  },
  host$inward: {
    animationName: `${inwardGrowKeyframes}, ${inwardShrinkKeyframes}`,
    borderRadius: `calc(${focusRingTokens.shape} - ${focusRingTokens.inwardOffset})`,
    borderWidth: focusRingTokens.width,
    borderStyle: 'solid',
    borderColor: 'currentColor',
    inset: focusRingTokens.inwardOffset,
  },
});
