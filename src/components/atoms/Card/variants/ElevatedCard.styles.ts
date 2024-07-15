import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { cardTokens } from '../Card.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-elevated-card.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-elevated-card.scss

export const elevatedCardStyles = stylex.create({
  host: {
    [cardTokens.containerColor]: colorRolesVars.surfaceContainerLow,
    [cardTokens.containerElevation]: elevationTokens.boxShadow$level1,
    [cardTokens.containerColor$disabled]: colorRolesVars.surface,
    [cardTokens.containerElevation$disabled]: elevationTokens.boxShadow$level1,
    [cardTokens.containerElevation$focus]: elevationTokens.boxShadow$level1,
    [cardTokens.containerElevation$hover]: elevationTokens.boxShadow$level2,
    [cardTokens.containerElevation$pressed]: elevationTokens.boxShadow$level1,
    [cardTokens.containerElevation$dragged]: elevationTokens.boxShadow$level4,
  },
});
