import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { chipTokens } from '../Chip.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-suggestion-chip.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-suggestion-chip.scss

export const suggestionChipStyles = stylex.create({
  host: {
    [chipTokens.flatContainerColor]: colorSchemeTokens.surfaceContainerLow,

    [chipTokens.stateLayerColor$hover]: colorSchemeTokens.onSurface,
    [chipTokens.stateLayerColor$pressed]: colorSchemeTokens.onSurface,
  },
});
