import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { fabTokens } from '../Fab.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-primary.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-primary.scss

export const primaryFabStyles = stylex.create({
  host: {
    [fabTokens.containerColor]: colorSchemeTokens.primaryContainer,

    [fabTokens.loweredContainerColor]: colorSchemeTokens.primaryContainer,

    [fabTokens.iconColor]: colorSchemeTokens.onPrimaryContainer,
    [fabTokens.iconColor$hover]: colorSchemeTokens.onPrimaryContainer,
    [fabTokens.iconColor$focus]: colorSchemeTokens.onPrimaryContainer,
    [fabTokens.iconColor$pressed]: colorSchemeTokens.onPrimaryContainer,

    [fabTokens.stateLayerColor$hover]: colorSchemeTokens.onPrimaryContainer,
    [fabTokens.stateLayerColor$pressed]: colorSchemeTokens.onPrimaryContainer,

    [fabTokens.labelTextColor]: colorSchemeTokens.onPrimaryContainer,
    [fabTokens.labelTextColor$hover]: colorSchemeTokens.onPrimaryContainer,
    [fabTokens.labelTextColor$focus]: colorSchemeTokens.onPrimaryContainer,
    [fabTokens.labelTextColor$pressed]: colorSchemeTokens.onPrimaryContainer,
  },
});
