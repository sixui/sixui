import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { fabTokens } from '../Fab.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-secondary.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-secondary.scss

export const secondaryFabStyles = stylex.create({
  host: {
    [fabTokens.containerColor]: colorRolesVars.secondaryContainer,

    [fabTokens.loweredContainerColor]: colorRolesVars.secondaryContainer,

    [fabTokens.iconColor]: colorRolesVars.onSecondaryContainer,
    [fabTokens.iconColor$hover]: colorRolesVars.onSecondaryContainer,
    [fabTokens.iconColor$focus]: colorRolesVars.onSecondaryContainer,
    [fabTokens.iconColor$pressed]: colorRolesVars.onSecondaryContainer,

    [fabTokens.stateLayerColor$hover]: colorRolesVars.onSecondaryContainer,
    [fabTokens.stateLayerColor$pressed]: colorRolesVars.onSecondaryContainer,

    [fabTokens.labelTextColor]: colorRolesVars.onSecondaryContainer,
    [fabTokens.labelTextColor$hover]: colorRolesVars.onSecondaryContainer,
    [fabTokens.labelTextColor$focus]: colorRolesVars.onSecondaryContainer,
    [fabTokens.labelTextColor$pressed]: colorRolesVars.onSecondaryContainer,
  },
});
