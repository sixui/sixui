import stylex from '@stylexjs/stylex';

import type { IStateThemeVars } from './state.types';

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-state.scss

export const stateTokens = stylex.defineVars<IStateThemeVars>({
  // statelayer
  stateLayerOpacity$hover: '0.08',
  // stateLayerOpacity$focus: '0', // not implemented
  stateLayerOpacity$pressed: '0.12',
  stateLayerOpacity$dragged: '0.16',

  // opacity
  opacity$disabled: '0.38',

  // container
  containerOpacity$disabled: '0.12',

  // outline
  outlineOpacity$disabled: '0.12',
});
