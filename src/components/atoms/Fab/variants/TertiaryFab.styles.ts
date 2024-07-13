import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { fabTokens } from '../Fab.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-tertiary.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-tertiary.scss

export const tertiaryFabStyles = stylex.create({
  host: {
    [fabTokens.containerColor]: colorRolesVars.tertiaryContainer,

    [fabTokens.loweredContainerColor]: colorRolesVars.tertiaryContainer,

    [fabTokens.iconColor]: colorRolesVars.onTertiaryContainer,
    [fabTokens.iconColor$hover]: colorRolesVars.onTertiaryContainer,
    [fabTokens.iconColor$focus]: colorRolesVars.onTertiaryContainer,
    [fabTokens.iconColor$pressed]: colorRolesVars.onTertiaryContainer,

    [fabTokens.stateLayerColor$hover]: colorRolesVars.onTertiaryContainer,
    [fabTokens.stateLayerColor$pressed]: colorRolesVars.onTertiaryContainer,

    [fabTokens.labelTextColor]: colorRolesVars.onTertiaryContainer,
    [fabTokens.labelTextColor$hover]: colorRolesVars.onTertiaryContainer,
    [fabTokens.labelTextColor$focus]: colorRolesVars.onTertiaryContainer,
    [fabTokens.labelTextColor$pressed]: colorRolesVars.onTertiaryContainer,
  },
});
