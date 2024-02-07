import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IPaperStyleStateVarKey } from '@/components/atoms/Paper';

const vars: IStyleVars<IPaperStyleStateVarKey> = {
  elevation: 'unset',
};

export const componentVars = stylex.defineVars(vars);
