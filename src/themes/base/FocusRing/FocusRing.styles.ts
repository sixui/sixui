import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import { componentVars as vars } from './FocusRing.stylex';
import { motionVars } from '../vars/motion.stylex';

// https://github.com/material-components/material-web/blob/main/focus/internal/_focus-ring.scss

const inwardGrowKeyframes = stylex.keyframes({
  '0%': { borderWidth: 0 },
  '100%': { borderWidth: vars.activeWidth },
});

const inwardShrinkKeyframes = stylex.keyframes({
  '0%': { borderWidth: vars.activeWidth },
});

const outwardGrowKeyframes = stylex.keyframes({
  '0%': { outlineWidth: 0 },
  '100%': { outlineWidth: vars.activeWidth },
});

const outwardShrinkKeyframes = stylex.keyframes({
  '0%': { outlineWidth: vars.activeWidth },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const styles: MapNamespaces<IFocusRingStyles> =
  stylex.create<IFocusRingStyles>({
    host: {
      animationDelay: `0s, calc(${vars.duration} * 0.25)`,
      animationDuration: `calc(${vars.duration} * 0.25), calc(${vars.duration} * 0.75)`,
      animationTimingFunction: motionVars.easing$emphasized,
      color: vars.color,
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
      borderRadius: `calc(${vars.shape} + ${vars.outwardOffset})`,
      inset: `calc(-1 * ${vars.outwardOffset})`,
      outline: `${vars.width} solid currentColor`,
    },
    host$inward: {
      animationName: `${inwardGrowKeyframes}, ${inwardShrinkKeyframes}`,
      borderRadius: `calc(${vars.shape} - ${vars.inwardOffset})`,
      borderWidth: vars.width,
      borderStyle: 'solid',
      borderColor: 'currentColor',
      inset: vars.inwardOffset,
    },
  });
