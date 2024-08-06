import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { chipTokens } from '../Chip.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-assist-chip.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-assist-chip.scss

export const assistChipStyles = stylex.create({
  host: {
    [chipTokens.flatContainerColor]: colorSchemeTokens.surfaceContainerLow,

    [chipTokens.stateLayerColor$hover]: colorSchemeTokens.onSurface,
    [chipTokens.stateLayerColor$pressed]: colorSchemeTokens.onSurface,

    [chipTokens.avatarShape]: shapeTokens.corner$full,
    [chipTokens.avatarSize]: `calc(24px * ${densityTokens.scale})`,
  },
});
