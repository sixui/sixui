import stylex from '@stylexjs/stylex';

import { stateTokens } from '~/themes/base/state.stylex';
import { motionTokens } from '~/themes/base/motion.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { circularProgressIndicatorTokens } from '../CircularProgressIndicator/CircularProgressIndicator.stylex';

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

    // Unsupported attribute, see https://github.com/facebook/stylex/issues/266#issuecomment-1871930136
    // eslint-disable-next-line @stylexjs/valid-styles
    r: `calc(50% * (1 - ${circularProgressIndicatorTokens.widthPct} / 100))`,
    // match size to indeterminate border width
    strokeWidth: `calc(${circularProgressIndicatorTokens.widthPct} * 1%)`,
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
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    color: colorSchemeTokens.onSurface,
    fontFamily: typeScaleTokens.labelFont$sm,
    fontSize: typeScaleTokens.labelSize$sm,
    fontWeight: typeScaleTokens.labelWeight$sm,
    lineHeight: typeScaleTokens.labelLineHeight$sm,
    letterSpacing: typeScaleTokens.labelLetterSpacing$sm,
  },
  label$disabled: {
    opacity: stateTokens.opacity$disabled,
  },
});
