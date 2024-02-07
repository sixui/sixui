import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ITabStyleStateVarKey } from '@/components/atoms/Tab';

const vars: IStyleVars<ITabStyleStateVarKey> = {
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

export const componentVars = stylex.defineVars(vars);
