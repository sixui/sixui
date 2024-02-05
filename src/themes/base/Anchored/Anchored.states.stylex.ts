import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IAnchoredStyleStateVarKey } from '@/components/utils/Anchored';

const vars: IStyleVars<IAnchoredStyleStateVarKey> = {
  horizontalTransform: '',
  verticalTransform: '',
};

export const componentVars = stylex.defineVars(vars);
