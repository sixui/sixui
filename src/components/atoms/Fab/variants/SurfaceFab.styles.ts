import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { fabTokens } from '../Fab.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-surface.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-surface.scss

export const surfaceFabStyles = stylex.create({
  host: {
    [fabTokens.containerColor]: colorRolesTokens.surfaceContainerHigh,

    [fabTokens.loweredContainerColor]: colorRolesTokens.surfaceContainerLow,

    [fabTokens.iconColor]: colorRolesTokens.primary,
    [fabTokens.iconColor$hover]: colorRolesTokens.primary,
    [fabTokens.iconColor$focus]: colorRolesTokens.primary,
    [fabTokens.iconColor$pressed]: colorRolesTokens.primary,

    [fabTokens.stateLayerColor$hover]: colorRolesTokens.primary,
    [fabTokens.stateLayerColor$pressed]: colorRolesTokens.primary,

    [fabTokens.labelTextColor]: colorRolesTokens.primary,
    [fabTokens.labelTextColor$hover]: colorRolesTokens.primary,
    [fabTokens.labelTextColor$focus]: colorRolesTokens.primary,
    [fabTokens.labelTextColor$pressed]: colorRolesTokens.primary,
  },
});
