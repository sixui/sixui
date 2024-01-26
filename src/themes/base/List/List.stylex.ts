import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IListStyleVarKey } from '@/components/atoms/List';
import { colorRolesVars } from '../vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-list.scss
// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-list.scss
const vars: Partial<IStyleVars<IListStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.surface,

  // divider
  dividerLeadingSpace: '16px',
  dividerTrailingSpace: '16px',
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IListStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
