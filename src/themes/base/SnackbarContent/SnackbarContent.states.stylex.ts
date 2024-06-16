import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ISnackbarContentStyleStateVarKey } from '@/components/atoms/SnackbarContent';

const vars: IStyleVars<ISnackbarContentStyleStateVarKey> = {
  elevation: 'unset',
};

export const componentVars = stylex.defineVars(vars);
