import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ICircularProgressIndicatorStyleVarKey } from '@/components/atoms/CircularProgressIndicator';
import { colorRolesVars } from '../vars/colorRoles.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-circular-progress-indicator.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-circular-progress-indicator.scss

const width = 2; // px

const size$md = 20; // px
const containerPadding$md = 0; // px

const size$lg = 40; // px
const containerPadding$lg = 0; // px

const vars: IStyleVars<ICircularProgressIndicatorStyleVarKey> = {
  color: colorRolesVars.primary,
  color$disabled: colorRolesVars.onSurface,
  size$md: `${size$md}px`,
  size$lg: `${size$lg}px`,
  containerPadding$md: `${containerPadding$md}px`,
  containerPadding$lg: `${containerPadding$lg}px`,
  widthPct$md: `calc((${width} / (${size$md} - ${containerPadding$md} * 2)) * 100)`,
  widthPct$lg: `calc((${width} / (${size$lg} - ${containerPadding$lg} * 2)) * 100)`,
};

export const componentVars = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
