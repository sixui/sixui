import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IFabStyleStateVarKey } from '@/components/atoms/Fab';

const vars: IStyleVars<IFabStyleStateVarKey> = {
  elevation: 'unset',
  containerShape: 'unset',
  iconColor: 'unset',
};

export const componentVars = stylex.defineVars(vars);
