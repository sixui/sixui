import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { chipTokens } from '../Chip.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filter-chip.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filter-chip.scss

export const filterChipStyles = stylex.create({
  host: {
    [chipTokens.flatContainerColor]: colorSchemeTokens.surfaceContainerLow,

    [chipTokens.selectedFlatContainerColor]:
      colorSchemeTokens.secondaryContainer,
    [chipTokens.selectedFlatContainerColor$disabled]:
      colorSchemeTokens.onSurface,

    [chipTokens.selectedOutlineWidth]: '0',

    [chipTokens.selectedElevatedContainerColor]:
      colorSchemeTokens.secondaryContainer,

    [chipTokens.selectedLabelTextColor]: colorSchemeTokens.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$hover]:
      colorSchemeTokens.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$focus]:
      colorSchemeTokens.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$pressed]:
      colorSchemeTokens.onSecondaryContainer,

    [chipTokens.stateLayerColor$hover]: colorSchemeTokens.onSurfaceVariant,
    [chipTokens.stateLayerColor$pressed]:
      colorSchemeTokens.onSecondaryContainer,

    [chipTokens.selectedStateLayerColor$hover]:
      colorSchemeTokens.onSecondaryContainer,
    [chipTokens.selectedStateLayerColor$pressed]:
      colorSchemeTokens.onSurfaceVariant,

    [chipTokens.selectedIconColor]: colorSchemeTokens.onSecondaryContainer,
    [chipTokens.selectedIconColor$focus]:
      colorSchemeTokens.onSecondaryContainer,
    [chipTokens.selectedIconColor$hover]:
      colorSchemeTokens.onSecondaryContainer,
    [chipTokens.selectedIconColor$pressed]:
      colorSchemeTokens.onSecondaryContainer,

    [chipTokens.trailingIconColor]: colorSchemeTokens.onSurfaceVariant,
    [chipTokens.trailingIconColor$disabled]: colorSchemeTokens.onSurface,
    [chipTokens.trailingIconColor$focus]: colorSchemeTokens.onSurfaceVariant,
    [chipTokens.trailingIconColor$hover]: colorSchemeTokens.onSurfaceVariant,
    [chipTokens.trailingIconColor$pressed]: colorSchemeTokens.onSurfaceVariant,

    [chipTokens.selectedTrailingIconColor]:
      colorSchemeTokens.onSecondaryContainer,
    [chipTokens.selectedTrailingIconColor$focus]:
      colorSchemeTokens.onSecondaryContainer,
    [chipTokens.selectedTrailingIconColor$hover]:
      colorSchemeTokens.onSecondaryContainer,
    [chipTokens.selectedTrailingIconColor$pressed]:
      colorSchemeTokens.onSecondaryContainer,
  },
});
