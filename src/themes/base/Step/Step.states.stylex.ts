import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IStepStyleStateVarKey } from '@/components/atoms/Step';

const vars: IStyleVars<IStepStyleStateVarKey> = {
  containerShape: 'unset',
  iconColor: 'unset',
};

export const componentVars = stylex.defineVars(vars);
