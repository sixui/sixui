import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { fabTokens } from '../Fab.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-fab-tertiary.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-fab-tertiary.scss

export const tertiaryFabStyles = stylex.create({
  host: {
    [fabTokens.containerColor]: colorSchemeTokens.tertiaryContainer,

    [fabTokens.loweredContainerColor]: colorSchemeTokens.tertiaryContainer,

    [fabTokens.iconColor]: colorSchemeTokens.onTertiaryContainer,
    [fabTokens.iconColor$hover]: colorSchemeTokens.onTertiaryContainer,
    [fabTokens.iconColor$focus]: colorSchemeTokens.onTertiaryContainer,
    [fabTokens.iconColor$pressed]: colorSchemeTokens.onTertiaryContainer,

    [fabTokens.stateLayerColor$hover]: colorSchemeTokens.onTertiaryContainer,
    [fabTokens.stateLayerColor$pressed]: colorSchemeTokens.onTertiaryContainer,

    [fabTokens.labelTextColor]: colorSchemeTokens.onTertiaryContainer,
    [fabTokens.labelTextColor$hover]: colorSchemeTokens.onTertiaryContainer,
    [fabTokens.labelTextColor$focus]: colorSchemeTokens.onTertiaryContainer,
    [fabTokens.labelTextColor$pressed]: colorSchemeTokens.onTertiaryContainer,
  },
});
