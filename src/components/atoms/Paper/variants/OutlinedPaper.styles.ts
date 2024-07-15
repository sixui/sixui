import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { componentVars as elevationVars } from '@/themes/base/Elevation/Elevation.stylex';
import { paperTokens } from '../Paper.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-outlined-Paper.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-outlined-Paper.scss

export const outlinedPaperStyles = stylex.create({
  host: {
    [paperTokens.containerColor]: colorRolesVars.surface,
    [paperTokens.containerElevation]: elevationVars.boxShadow$level0,
    [paperTokens.outlineStyle]: 'solid',
  },
});
