import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IStepStyleStateVarKey } from '@/components/atoms/Step';

const vars: IStyleVars<IStepStyleStateVarKey> = {
  // container
  containerShape: 'unset',
};

export const componentVars = stylex.defineVars(vars);
