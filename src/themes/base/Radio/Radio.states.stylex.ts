import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IRadioStyleStateVarKey } from '@/components/atoms/Radio';

const vars: IStyleVars<IRadioStyleStateVarKey> = {
  // stateLayer
  // &:hover
  stateLayerColor$hover: 'unset',
  stateLayerOpacity$hover: 'unset',
  // &:pressed
  stateLayerColor$pressed: 'unset',
  stateLayerOpacity$pressed: 'unset',
};

export const componentVars = stylex.defineVars(vars);
