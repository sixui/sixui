import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { elevationTokens } from '@/components/Elevation/Elevation.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-menulist.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-menulist.scss

const vars = {
  // container
  containerColor: colorSchemeTokens.surfaceContainer,
  containerElevation: elevationTokens.boxShadow$level2,
  containerShape: shapeTokens.corner$xs,

  // content
  contentMaxHeight: '300px',
};

export const menuListTokens = stylex.defineVars(vars);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const menuListTheme = stylex.createTheme(menuListTokens, vars);
