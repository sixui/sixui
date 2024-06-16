import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ISnackbarStyleStateVarKey } from '@/components/atoms/Snackbar';

const vars: IStyleVars<ISnackbarStyleStateVarKey> = {
  elevation: 'unset',
};

export const componentVars = stylex.defineVars(vars);
