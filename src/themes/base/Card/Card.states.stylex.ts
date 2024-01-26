import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ICardStyleStateVarKey } from '@/components/atoms/Card';

const vars: IStyleVars<ICardStyleStateVarKey> = {
  elevation: 'unset',
};

export const componentVars = stylex.defineVars(vars);
