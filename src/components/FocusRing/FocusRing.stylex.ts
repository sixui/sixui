import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { motionTokens } from '@/themes/base/motion.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-focus-ring.scss

const vars = {
  activeWidth: '8px',
  color: colorSchemeTokens.secondary,
  duration: motionTokens.duration$long4,
  inwardOffset: '0px',
  outwardOffset: '2px',
  shape: shapeTokens.corner$none,
  width: '3px',
};

export const focusRingTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const focusRingTheme = stylex.createTheme(focusRingTokens, vars);
