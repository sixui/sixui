import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { fabTokens } from '../Fab.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-branded.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-branded.scss

export const brandedFabStyles = stylex.create({
  host: {
    [fabTokens.containerColor]: colorRolesTokens.surfaceContainerHigh,

    [fabTokens.loweredContainerColor]: colorRolesTokens.surfaceContainerLow,

    [fabTokens.iconSize$md]: '36px',
    [fabTokens.iconSize$lg]: '48px',

    [fabTokens.stateLayerColor$hover]: colorRolesTokens.primary,
    [fabTokens.stateLayerColor$pressed]: colorRolesTokens.primary,

    [fabTokens.labelTextColor]: colorRolesTokens.primary,
    [fabTokens.labelTextColor$hover]: colorRolesTokens.primary,
    [fabTokens.labelTextColor$focus]: colorRolesTokens.primary,
    [fabTokens.labelTextColor$pressed]: colorRolesTokens.primary,
  },
});
