import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { chipTokens } from '../Chip.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filter-chip.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filter-chip.scss

export const filterChipStyles = stylex.create({
  host: {
    [chipTokens.flatContainerColor]: colorRolesTokens.surfaceContainerLow,

    [chipTokens.selectedFlatContainerColor]:
      colorRolesTokens.secondaryContainer,
    [chipTokens.selectedFlatContainerColor$disabled]:
      colorRolesTokens.onSurface,

    [chipTokens.selectedOutlineWidth]: '0',

    [chipTokens.selectedElevatedContainerColor]:
      colorRolesTokens.secondaryContainer,

    [chipTokens.selectedLabelTextColor]: colorRolesTokens.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$hover]:
      colorRolesTokens.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$focus]:
      colorRolesTokens.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$pressed]:
      colorRolesTokens.onSecondaryContainer,

    [chipTokens.stateLayerColor$hover]: colorRolesTokens.onSurfaceVariant,
    [chipTokens.stateLayerColor$pressed]: colorRolesTokens.onSecondaryContainer,

    [chipTokens.selectedStateLayerColor$hover]:
      colorRolesTokens.onSecondaryContainer,
    [chipTokens.selectedStateLayerColor$pressed]:
      colorRolesTokens.onSurfaceVariant,

    [chipTokens.selectedIconColor]: colorRolesTokens.onSecondaryContainer,
    [chipTokens.selectedIconColor$focus]: colorRolesTokens.onSecondaryContainer,
    [chipTokens.selectedIconColor$hover]: colorRolesTokens.onSecondaryContainer,
    [chipTokens.selectedIconColor$pressed]:
      colorRolesTokens.onSecondaryContainer,

    [chipTokens.trailingIconColor]: colorRolesTokens.onSurfaceVariant,
    [chipTokens.trailingIconColor$disabled]: colorRolesTokens.onSurface,
    [chipTokens.trailingIconColor$focus]: colorRolesTokens.onSurfaceVariant,
    [chipTokens.trailingIconColor$hover]: colorRolesTokens.onSurfaceVariant,
    [chipTokens.trailingIconColor$pressed]: colorRolesTokens.onSurfaceVariant,

    [chipTokens.selectedTrailingIconColor]:
      colorRolesTokens.onSecondaryContainer,
    [chipTokens.selectedTrailingIconColor$focus]:
      colorRolesTokens.onSecondaryContainer,
    [chipTokens.selectedTrailingIconColor$hover]:
      colorRolesTokens.onSecondaryContainer,
    [chipTokens.selectedTrailingIconColor$pressed]:
      colorRolesTokens.onSecondaryContainer,
  },
});
