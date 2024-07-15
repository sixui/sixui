import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { fabTokens } from '../Fab.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-tertiary.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-tertiary.scss

export const tertiaryFabStyles = stylex.create({
  host: {
    [fabTokens.containerColor]: colorRolesTokens.tertiaryContainer,

    [fabTokens.loweredContainerColor]: colorRolesTokens.tertiaryContainer,

    [fabTokens.iconColor]: colorRolesTokens.onTertiaryContainer,
    [fabTokens.iconColor$hover]: colorRolesTokens.onTertiaryContainer,
    [fabTokens.iconColor$focus]: colorRolesTokens.onTertiaryContainer,
    [fabTokens.iconColor$pressed]: colorRolesTokens.onTertiaryContainer,

    [fabTokens.stateLayerColor$hover]: colorRolesTokens.onTertiaryContainer,
    [fabTokens.stateLayerColor$pressed]: colorRolesTokens.onTertiaryContainer,

    [fabTokens.labelTextColor]: colorRolesTokens.onTertiaryContainer,
    [fabTokens.labelTextColor$hover]: colorRolesTokens.onTertiaryContainer,
    [fabTokens.labelTextColor$focus]: colorRolesTokens.onTertiaryContainer,
    [fabTokens.labelTextColor$pressed]: colorRolesTokens.onTertiaryContainer,
  },
});
