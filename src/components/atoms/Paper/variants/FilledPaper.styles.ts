import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { paperTokens } from '../Paper.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-Paper.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-Paper.scss

export const filledPaperStyles = stylex.create({
  host: {
    [paperTokens.containerColor]: colorRolesVars.surfaceContainer,
    [paperTokens.containerElevation]: elevationTokens.boxShadow$level0,
  },
});
