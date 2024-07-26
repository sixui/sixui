import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { fabTokens } from '../Fab.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-branded.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-branded.scss

export const brandedFabStyles = stylex.create({
  host: {
    [fabTokens.containerColor]: colorSchemeTokens.surfaceContainerHigh,

    [fabTokens.loweredContainerColor]: colorSchemeTokens.surfaceContainerLow,

    [fabTokens.iconSize$md]: '36px',
    [fabTokens.iconSize$lg]: '48px',

    [fabTokens.stateLayerColor$hover]: colorSchemeTokens.primary,
    [fabTokens.stateLayerColor$pressed]: colorSchemeTokens.primary,

    [fabTokens.labelTextColor]: colorSchemeTokens.primary,
    [fabTokens.labelTextColor$hover]: colorSchemeTokens.primary,
    [fabTokens.labelTextColor$focus]: colorSchemeTokens.primary,
    [fabTokens.labelTextColor$pressed]: colorSchemeTokens.primary,
  },
});
