import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IDeterminateCircularProgressIndicatorStyleKey } from '@/components/atoms/CircularProgressIndicator';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { typescaleVars } from '../vars/typo.stylex';
import { stateVars } from '../vars/state.stylex';
import { componentVars as vars } from '../CircularProgressIndicator/CircularProgressIndicator.stylex';
import { motionVars } from '../vars/motion.stylex';

// https://github.com/material-components/material-web/blob/main/progress/internal/_circulardeterminate-progress.scss

const color$disabled = `color-mix(in srgb, ${vars.color$disabled} calc(${stateVars.opacity$disabled} * 100%), transparent)`;

type IDeterminateCircularProgressIndicatorStyles =
  IStyles<IDeterminateCircularProgressIndicatorStyleKey>;
export const styles: MapNamespaces<IDeterminateCircularProgressIndicatorStyles> =
  stylex.create<IDeterminateCircularProgressIndicatorStyles>({
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
      r: `calc(50% * (1 - ${vars.widthPct$md} / 100))`,
      // match size to indeterminate border width
      strokeWidth: `calc(${vars.widthPct$md} * 1%)`,
    },
    svgCircle$lg: {
      // Unsupported attribute, see https://github.com/facebook/stylex/issues/266#issuecomment-1871930136
      // eslint-disable-next-line @stylexjs/valid-styles
      r: `calc(50% * (1 - ${vars.widthPct$lg} / 100))`,
      // match size to indeterminate border width
      strokeWidth: `calc(${vars.widthPct$lg} * 1%)`,
    },
    track: {
      stroke: 'transparent',
    },
    activeTrack: {
      // note, these value come from the m2 version but match current gm3 values.
      transitionProperty: 'stroke-dashoffset',
      transitionDuration: motionVars.duration$long2,
      transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
      stroke: vars.color,
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
      color: colorRolesVars.onSurface,
      fontFamily: typescaleVars.labelFont$sm,
      fontSize: typescaleVars.labelSize$sm,
      fontWeight: typescaleVars.labelWeight$sm,
      lineHeight: typescaleVars.labelLineHeight$sm,
      letterSpacing: typescaleVars.labelLetterSpacing$sm,
    },
    label$disabled: {
      opacity: stateVars.opacity$disabled,
    },
  });
