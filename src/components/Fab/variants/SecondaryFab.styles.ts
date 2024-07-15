import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { fabTokens } from '../Fab.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-secondary.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-secondary.scss

export const secondaryFabStyles = stylex.create({
  host: {
    [fabTokens.containerColor]: colorRolesTokens.secondaryContainer,

    [fabTokens.loweredContainerColor]: colorRolesTokens.secondaryContainer,

    [fabTokens.iconColor]: colorRolesTokens.onSecondaryContainer,
    [fabTokens.iconColor$hover]: colorRolesTokens.onSecondaryContainer,
    [fabTokens.iconColor$focus]: colorRolesTokens.onSecondaryContainer,
    [fabTokens.iconColor$pressed]: colorRolesTokens.onSecondaryContainer,

    [fabTokens.stateLayerColor$hover]: colorRolesTokens.onSecondaryContainer,
    [fabTokens.stateLayerColor$pressed]: colorRolesTokens.onSecondaryContainer,

    [fabTokens.labelTextColor]: colorRolesTokens.onSecondaryContainer,
    [fabTokens.labelTextColor$hover]: colorRolesTokens.onSecondaryContainer,
    [fabTokens.labelTextColor$focus]: colorRolesTokens.onSecondaryContainer,
    [fabTokens.labelTextColor$pressed]: colorRolesTokens.onSecondaryContainer,
  },
});
