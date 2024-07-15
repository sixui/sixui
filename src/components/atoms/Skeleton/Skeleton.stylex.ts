import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';

const vars = {
  zIndex: '9',

  // container
  containerShape: `min(0.25em, ${shapeTokens.corner$xs})`,
  containerColor: colorRolesTokens.surfaceContainerHigh,
  // &:error
  containerColor$error: colorRolesTokens.errorContainer,

  // animation
  animationTargetColor: colorRolesTokens.inverseSurface,
  // &:pulse
  animationMaxOpacity$pulse: '0.12',
  animationDuration$pulse: '2s',
  animationDelay$pulse: '0.5s',
  // &:wave
  animationMaxOpacity$wave: '0.08',
  animationDuration$wave: '2s',
  animationDelay$wave: '0.5s',
};

export const skeletonTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const skeletonTheme = stylex.createTheme(skeletonTokens, vars);
