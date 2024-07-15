import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { fabTokens } from '../Fab.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-primary.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-primary.scss

export const primaryFabStyles = stylex.create({
  host: {
    [fabTokens.containerColor]: colorRolesTokens.primaryContainer,

    [fabTokens.loweredContainerColor]: colorRolesTokens.primaryContainer,

    [fabTokens.iconColor]: colorRolesTokens.onPrimaryContainer,
    [fabTokens.iconColor$hover]: colorRolesTokens.onPrimaryContainer,
    [fabTokens.iconColor$focus]: colorRolesTokens.onPrimaryContainer,
    [fabTokens.iconColor$pressed]: colorRolesTokens.onPrimaryContainer,

    [fabTokens.stateLayerColor$hover]: colorRolesTokens.onPrimaryContainer,
    [fabTokens.stateLayerColor$pressed]: colorRolesTokens.onPrimaryContainer,

    [fabTokens.labelTextColor]: colorRolesTokens.onPrimaryContainer,
    [fabTokens.labelTextColor$hover]: colorRolesTokens.onPrimaryContainer,
    [fabTokens.labelTextColor$focus]: colorRolesTokens.onPrimaryContainer,
    [fabTokens.labelTextColor$pressed]: colorRolesTokens.onPrimaryContainer,
  },
});
