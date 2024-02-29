import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ISvgIconStyleVarKey } from '@/components/atoms/SvgIcon';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-icon.scss

const vars: Partial<IStyleVars<ISvgIconStyleVarKey>> = {
  size: '24px',
  font: 'unset',
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<ISvgIconStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
