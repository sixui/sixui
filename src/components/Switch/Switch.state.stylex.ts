import stylex from '@stylexjs/stylex';

const vars = {
  trackColor: 'unset',
  stateLayerColor$hover: 'unset',
  stateLayerOpacity$hover: 'unset',
  stateLayerColor$pressed: 'unset',
  stateLayerOpacity$pressed: 'unset',
  selectedIconTransform$on: 'unset',
  iconColor: 'unset',
};

export const switchStateTokens = stylex.defineVars(vars);
