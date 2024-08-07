import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { chipTokens } from '../Chip.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-input-chip.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-input-chip.scss

export const inputChipStyles = stylex.create({
  host: {
    [chipTokens.flatContainerColor]: colorSchemeTokens.surfaceContainerLow,

    [chipTokens.selectedFlatContainerColor]:
      colorSchemeTokens.secondaryContainer,
    [chipTokens.selectedFlatContainerColor$disabled]:
      colorSchemeTokens.onSurface,

    [chipTokens.selectedOutlineWidth]: outlineTokens.width$none,

    [chipTokens.selectedLabelTextColor]: colorSchemeTokens.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$hover]:
      colorSchemeTokens.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$focus]:
      colorSchemeTokens.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$pressed]:
      colorSchemeTokens.onSecondaryContainer,

    [chipTokens.stateLayerColor$hover]: colorSchemeTokens.onSurfaceVariant,
    [chipTokens.stateLayerColor$pressed]: colorSchemeTokens.onSurfaceVariant,

    [chipTokens.selectedStateLayerColor$hover]:
      colorSchemeTokens.onSecondaryContainer,
    [chipTokens.selectedStateLayerColor$pressed]:
      colorSchemeTokens.onSecondaryContainer,

    [chipTokens.selectedIconColor]: colorSchemeTokens.primary,
    [chipTokens.selectedIconColor$focus]: colorSchemeTokens.primary,
    [chipTokens.selectedIconColor$hover]: colorSchemeTokens.primary,
    [chipTokens.selectedIconColor$pressed]: colorSchemeTokens.primary,

    [chipTokens.trailingIconTrailingSpace]: spacingTokens.padding$2,

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
