import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ICheckboxStyleStateVarKey } from '@/components/atoms/Checkbox';

const vars: IStyleVars<ICheckboxStyleStateVarKey> = {
  // stateLayer
  // &:hover
  stateLayerColor$hover: 'unset',
  stateLayerOpacity$hover: 'unset',
  // &:pressed
  stateLayerColor$pressed: 'unset',
  stateLayerOpacity$pressed: 'unset',
};

export const componentVars = stylex.defineVars(vars);
