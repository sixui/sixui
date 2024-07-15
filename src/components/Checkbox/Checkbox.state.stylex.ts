import stylex from '@stylexjs/stylex';

const vars = {
  // stateLayer
  // &:hover
  stateLayerColor$hover: 'unset',
  stateLayerOpacity$hover: 'unset',
  // &:pressed
  stateLayerColor$pressed: 'unset',
  stateLayerOpacity$pressed: 'unset',
};

export const checkboxStateTokens = stylex.defineVars(vars);
