import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IIconStyleVarKey } from '@/components/atoms/Icon';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-icon.scss
const vars: Partial<IStyleVars<IIconStyleVarKey>> = {
  size: '24px',
  font: 'unset',
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IIconStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
