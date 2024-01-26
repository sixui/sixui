import * as stylex from '@stylexjs/stylex';

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-state.scss
export const stateVars = stylex.defineVars({
  // statelayer
  stateLayerOpacity$hover: '0.08',
  // stateLayerOpacity$focus: '0', // not implemented
  stateLayerOpacity$pressed: '0.12',
  // stateLayerOpacity$dragged: '0.16', // not implemented

  // opacity
  opacity$disabled: '0.38',

  // container
  containerOpacity$disabled: '0.12',

  // outline
  outlineOpacity$disabled: '0.12',
});
