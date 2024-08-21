import stylex from '@stylexjs/stylex';

const vars = {
  containerShape: 'unset',
  stateLayerColor$hover: 'unset',
  stateLayerOpacity$hover: 'unset',
  stateLayerColor$pressed: 'unset',
  stateLayerOpacity$pressed: 'unset',
};

export const navigationRailDestinationStateTokens = stylex.defineVars(vars);
