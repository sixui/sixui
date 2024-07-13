import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { componentVars as elevationVars } from '@/themes/base/Elevation/Elevation.stylex';
import { cardTokens } from '../Card.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-elevated-card.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-elevated-card.scss

export const elevatedCardStyles = stylex.create({
  host: {
    [cardTokens.containerColor]: colorRolesVars.surfaceContainerLow,
    [cardTokens.containerElevation]: elevationVars.boxShadow$level1,
    [cardTokens.containerColor$disabled]: colorRolesVars.surface,
    [cardTokens.containerElevation$disabled]: elevationVars.boxShadow$level1,
    [cardTokens.containerElevation$focus]: elevationVars.boxShadow$level1,
    [cardTokens.containerElevation$hover]: elevationVars.boxShadow$level2,
    [cardTokens.containerElevation$pressed]: elevationVars.boxShadow$level1,
    [cardTokens.containerElevation$dragged]: elevationVars.boxShadow$level4,
  },
});
