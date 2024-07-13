import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { fabTokens } from '../Fab.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-primary.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-primary.scss

export const primaryFabStyles = stylex.create({
  host: {
    [fabTokens.containerColor]: colorRolesVars.primaryContainer,

    [fabTokens.loweredContainerColor]: colorRolesVars.primaryContainer,

    [fabTokens.iconColor]: colorRolesVars.onPrimaryContainer,
    [fabTokens.iconColor$hover]: colorRolesVars.onPrimaryContainer,
    [fabTokens.iconColor$focus]: colorRolesVars.onPrimaryContainer,
    [fabTokens.iconColor$pressed]: colorRolesVars.onPrimaryContainer,

    [fabTokens.stateLayerColor$hover]: colorRolesVars.onPrimaryContainer,
    [fabTokens.stateLayerColor$pressed]: colorRolesVars.onPrimaryContainer,

    [fabTokens.labelTextColor]: colorRolesVars.onPrimaryContainer,
    [fabTokens.labelTextColor$hover]: colorRolesVars.onPrimaryContainer,
    [fabTokens.labelTextColor$focus]: colorRolesVars.onPrimaryContainer,
    [fabTokens.labelTextColor$pressed]: colorRolesVars.onPrimaryContainer,
  },
});
