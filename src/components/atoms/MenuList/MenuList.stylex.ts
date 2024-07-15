import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-menulist.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-menulist.scss

const vars = {
  // container
  containerColor: colorRolesVars.surfaceContainer,
  containerElevation: elevationTokens.boxShadow$level2,
  containerShape: shapeVars.corner$xs,

  // content
  contentMaxHeight: '300px',
};

export const menuListTokens = stylex.defineVars(vars);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const menuListTheme = stylex.createTheme(menuListTokens, vars);
