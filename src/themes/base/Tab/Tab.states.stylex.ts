import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ITabStyleStateVarKey } from '@/components/atoms/Tab';

const vars: IStyleVars<ITabStyleStateVarKey> = {
  focusRingMarginBottom: 'unset',

  // stateLayer
  // &:hover
  stateLayerColor$hover: 'unset',
  stateLayerOpacity$hover: 'unset',
  // &:pressed
  stateLayerColor$pressed: 'unset',
  stateLayerOpacity$pressed: 'unset',
};

export const componentVars = stylex.defineVars(vars);
