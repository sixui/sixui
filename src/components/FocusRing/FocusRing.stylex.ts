import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { motionTokens } from '~/themes/base/motion.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-focus-ring.scss

const vars = {
  activeWidth: outlineTokens.width$xl,
  color: colorSchemeTokens.secondary,
  duration: motionTokens.duration$long4,
  inwardOffset: '0px',
  outwardOffset: `calc(2px * ${scaleTokens.scale})`,
  shape: shapeTokens.corner$none,
  width: outlineTokens.width$md,
};

export const focusRingTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const focusRingTheme = stylex.createTheme(focusRingTokens, vars);
