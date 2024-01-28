import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ITabStyleVarKey } from '@/components/atoms/Tab';
import { componentVars as baseComponentVars } from './Tab.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-secondary-tab.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-secondary-navigation-tab.scss

const vars: Partial<IStyleVars<ITabStyleVarKey>> = {
  // activeIndicator
  activeIndicatorHeight: '2px',

  // activeLabelText
  activeLabelTextColor: colorRolesVars.onSurface,
};

export const componentTheme = stylex.createTheme(baseComponentVars, vars);
