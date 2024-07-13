import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { chipTokens } from '../Chip.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-suggestion-chip.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-suggestion-chip.scss

export const suggestionChipStyles = stylex.create({
  host: {
    [chipTokens.flatContainerColor]: colorRolesVars.surfaceContainerLow,

    [chipTokens.stateLayerColor$hover]: colorRolesVars.onSurface,
    [chipTokens.stateLayerColor$pressed]: colorRolesVars.onSurface,
  },
});
