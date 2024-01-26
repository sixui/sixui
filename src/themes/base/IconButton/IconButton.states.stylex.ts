import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IIconButtonStyleStateVarKey } from '@/components/atoms/IconButton';

const vars: IStyleVars<IIconButtonStyleStateVarKey> = {
  iconColor: 'unset',
  outlineColor: 'unset',
  stateLayerColor$hover: 'unset',
  stateLayerColor$pressed: 'unset',
  stateLayerOpacity$hover: 'unset',
  stateLayerOpacity$pressed: 'unset',
};

export const componentVars = stylex.defineVars(vars);
