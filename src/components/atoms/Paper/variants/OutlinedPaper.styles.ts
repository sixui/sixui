import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { paperTokens } from '../Paper.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-outlined-Paper.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-outlined-Paper.scss

export const outlinedPaperStyles = stylex.create({
  host: {
    [paperTokens.containerColor]: colorRolesVars.surface,
    [paperTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [paperTokens.outlineStyle]: 'solid',
  },
});
