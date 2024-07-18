import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { fabTokens } from '../Fab.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-secondary.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-secondary.scss

export const secondaryFabStyles = stylex.create({
  host: {
    [fabTokens.containerColor]: colorSchemeTokens.secondaryContainer,

    [fabTokens.loweredContainerColor]: colorSchemeTokens.secondaryContainer,

    [fabTokens.iconColor]: colorSchemeTokens.onSecondaryContainer,
    [fabTokens.iconColor$hover]: colorSchemeTokens.onSecondaryContainer,
    [fabTokens.iconColor$focus]: colorSchemeTokens.onSecondaryContainer,
    [fabTokens.iconColor$pressed]: colorSchemeTokens.onSecondaryContainer,

    [fabTokens.stateLayerColor$hover]: colorSchemeTokens.onSecondaryContainer,
    [fabTokens.stateLayerColor$pressed]: colorSchemeTokens.onSecondaryContainer,

    [fabTokens.labelTextColor]: colorSchemeTokens.onSecondaryContainer,
    [fabTokens.labelTextColor$hover]: colorSchemeTokens.onSecondaryContainer,
    [fabTokens.labelTextColor$focus]: colorSchemeTokens.onSecondaryContainer,
    [fabTokens.labelTextColor$pressed]: colorSchemeTokens.onSecondaryContainer,
  },
});
