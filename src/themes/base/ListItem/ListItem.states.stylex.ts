import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IListItemStyleStateVarKey } from '@/components/atoms/ListItem';

const vars: IStyleVars<IListItemStyleStateVarKey> = {
  nonTextColor: 'unset',
  nonTextOpacity: 'unset',
  textColor: 'unset',
  textOpacity: 'unset',
  leadingSpace: 'unset',
  trailingSpace: 'unset',
};

export const componentVars = stylex.defineVars(vars);
