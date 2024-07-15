import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { elevationTokens } from '@/components/Elevation/Elevation.stylex';
import { paperTokens } from '../Paper.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-Paper.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-Paper.scss

export const filledPaperStyles = stylex.create({
  host: {
    [paperTokens.containerColor]: colorRolesTokens.surfaceContainer,
    [paperTokens.containerElevation]: elevationTokens.boxShadow$level0,
  },
});
