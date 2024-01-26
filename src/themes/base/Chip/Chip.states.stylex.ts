import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IChipStyleStateVarKey } from '@/components/atoms/Chip';

const vars: IStyleVars<IChipStyleStateVarKey> = {
  containerShape: 'unset',
  elevation: 'unset',
  iconColor: 'unset',
};

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentVars = stylex.defineVars(vars);
