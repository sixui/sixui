import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { zIndexTokens } from '~/themes/base/zIndex.stylex';

const vars = {
  zIndex: `calc(${zIndexTokens.app} + 1)`,

  // container
  containerShape: `min(0.25em, ${shapeTokens.corner$xs})`,
  containerColor: colorSchemeTokens.surfaceContainerHigh,
  // &:error
  containerColor$error: colorSchemeTokens.errorContainer,

  // animation
  animationTargetColor: colorSchemeTokens.inverseSurface,
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
