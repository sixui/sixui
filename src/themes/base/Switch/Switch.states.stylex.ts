import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ISwitchStyleStateVarKey } from '@/components/atoms/Switch';

const vars: IStyleVars<ISwitchStyleStateVarKey> = {
  trackColor: 'unset',
  stateLayerColor$hover: 'unset',
  stateLayerOpacity$hover: 'unset',
  stateLayerColor$pressed: 'unset',
  stateLayerOpacity$pressed: 'unset',
  selectedIconTransform$on: 'unset',
  iconColor: 'unset',
};

export const componentVars = stylex.defineVars(vars);
