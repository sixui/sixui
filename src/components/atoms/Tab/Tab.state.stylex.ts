import stylex from '@stylexjs/stylex';

const vars = {
  elevation: 'unset',

  // stateLayer
  // &:disabled
  stateLayerColor$disabled: 'unset',
  // &:hover
  stateLayerColor$hover: 'unset',
  stateLayerOpacity$hover: 'unset',
  // &:pressed
  stateLayerColor$pressed: 'unset',
  stateLayerOpacity$pressed: 'unset',
};

export const tabStateTokens = stylex.defineVars(vars);
