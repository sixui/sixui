import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { componentVars as elevationVars } from '@/themes/base/Elevation/Elevation.stylex';
import { cardTokens } from '../Card.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-card.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-card.scss

export const filledCardStyles = stylex.create({
  host: {
    [cardTokens.containerColor]: colorRolesVars.surfaceContainerHighest,
    [cardTokens.containerElevation]: elevationVars.boxShadow$level0,
    [cardTokens.containerColor$disabled]:
      colorRolesVars.surfaceContainerHighest,
    [cardTokens.containerElevation$disabled]: elevationVars.boxShadow$level0,
    [cardTokens.containerElevation$focus]: elevationVars.boxShadow$level0,
    [cardTokens.containerElevation$hover]: elevationVars.boxShadow$level1,
    [cardTokens.containerElevation$pressed]: elevationVars.boxShadow$level0,
    [cardTokens.containerElevation$dragged]: elevationVars.boxShadow$level3,
  },
});
