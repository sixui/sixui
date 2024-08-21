import stylex from '@stylexjs/stylex';

const vars = {
  nonTextColor: 'unset',
  nonTextOpacity: 'unset',
  textColor: 'unset',
  textOpacity: 'unset',
  leadingSpace: 'unset',
  trailingSpace: 'unset',
  containerMinHeight: 'unset',
  topSpace: 'unset',
  bottomSpace: 'unset',
  stateLayerColor$hover: 'unset',
  stateLayerColor$pressed: 'unset',
};

export const listItemStateTokens = stylex.defineVars(vars);
