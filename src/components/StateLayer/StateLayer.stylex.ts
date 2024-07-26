import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { stateTokens } from '~/themes/base/state.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-ripple.scss

const vars = {
  color$hover: colorSchemeTokens.onSurface,
  color$pressed: colorSchemeTokens.onSurface,
  color$dragged: colorSchemeTokens.onSurface,
  opacity$hover: stateTokens.stateLayerOpacity$hover,
  opacity$pressed: stateTokens.stateLayerOpacity$pressed,
  opacity$dragged: stateTokens.stateLayerOpacity$dragged,
};

export const stateLayerTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const stateLayerTheme = stylex.createTheme(stateLayerTokens, vars);
