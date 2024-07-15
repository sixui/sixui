import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { cardTokens } from '../Card.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-card.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filled-card.scss

export const filledCardStyles = stylex.create({
  host: {
    [cardTokens.containerColor]: colorRolesTokens.surfaceContainerHighest,
    [cardTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [cardTokens.containerColor$disabled]:
      colorRolesTokens.surfaceContainerHighest,
    [cardTokens.containerElevation$disabled]: elevationTokens.boxShadow$level0,
    [cardTokens.containerElevation$focus]: elevationTokens.boxShadow$level0,
    [cardTokens.containerElevation$hover]: elevationTokens.boxShadow$level1,
    [cardTokens.containerElevation$pressed]: elevationTokens.boxShadow$level0,
    [cardTokens.containerElevation$dragged]: elevationTokens.boxShadow$level3,
  },
});
