import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IButtonStyleStateVarKey } from '@/components/atoms/Button';

const vars: IStyleVars<IButtonStyleStateVarKey> = {
  elevation: 'unset',
  iconColor: 'unset',
};

export const componentVars = stylex.defineVars(vars);
