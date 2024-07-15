import stylex from '@stylexjs/stylex';

import { stateTokens } from '@/themes/base/state.stylex';
import { motionTokens } from '@/themes/base/motion.stylex';
import { circularProgressIndicatorTokens } from '@/components/atoms/CircularProgressIndicator/CircularProgressIndicator.stylex';

// https://github.com/material-components/material-web/blob/main/progress/internal/_circulardeterminate-progress.scss

const color$disabled = `color-mix(in srgb, ${circularProgressIndicatorTokens.color$disabled} calc(${stateTokens.opacity$disabled} * 100%), transparent)`;

export type IDeterminateCircularProgressIndicatorStylesKey =
  keyof typeof determinateCircularProgressIndicatorStyles;
export const determinateCircularProgressIndicatorStyles = stylex.create({
  svg: {
    transform: 'rotate(-90deg)',
  },
  svgCircle: {
    // Unsupported attributes, see https://github.com/facebook/stylex/issues/266#issuecomment-1871930136
    // eslint-disable-next-line @stylexjs/valid-styles
    cx: '50%',
    // eslint-disable-next-line @stylexjs/valid-styles
    cy: '50%',
    // note, pathLength is set so this can be normalized
    strokeDasharray: '100',
    fill: 'transparent',
  },
  svgCircle$md: {
    // Unsupported attribute, see https://github.com/facebook/stylex/issues/266#issuecomment-1871930136
    // eslint-disable-next-line @stylexjs/valid-styles
    r: `calc(50% * (1 - ${circularProgressIndicatorTokens.widthPct$md} / 100))`,
    // match size to indeterminate border width
    strokeWidth: `calc(${circularProgressIndicatorTokens.widthPct$md} * 1%)`,
  },
  svgCircle$lg: {
    // Unsupported attribute, see https://github.com/facebook/stylex/issues/266#issuecomment-1871930136
    // eslint-disable-next-line @stylexjs/valid-styles
    r: `calc(50% * (1 - ${circularProgressIndicatorTokens.widthPct$lg} / 100))`,
    // match size to indeterminate border width
    strokeWidth: `calc(${circularProgressIndicatorTokens.widthPct$lg} * 1%)`,
  },
  track: {
    stroke: 'transparent',
  },
  activeTrack: {
    // note, these value come from the m2 version but match current gm3 values.
    transitionProperty: 'stroke-dashoffset',
    transitionDuration: motionTokens.duration$long2,
    transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    stroke: circularProgressIndicatorTokens.color,
  },
  activeTrack$disabled: {
    stroke: color$disabled,
  },
});
