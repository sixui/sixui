import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { fabTokens } from '../Fab.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-branded.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-branded.scss

export const brandedFabStyles = stylex.create({
  host: {
    [fabTokens.containerColor]: colorRolesVars.surfaceContainerHigh,

    [fabTokens.loweredContainerColor]: colorRolesVars.surfaceContainerLow,

    [fabTokens.iconSize$md]: '36px',
    [fabTokens.iconSize$lg]: '48px',

    [fabTokens.stateLayerColor$hover]: colorRolesVars.primary,
    [fabTokens.stateLayerColor$pressed]: colorRolesVars.primary,

    [fabTokens.labelTextColor]: colorRolesVars.primary,
    [fabTokens.labelTextColor$hover]: colorRolesVars.primary,
    [fabTokens.labelTextColor$focus]: colorRolesVars.primary,
    [fabTokens.labelTextColor$pressed]: colorRolesVars.primary,
  },
});
