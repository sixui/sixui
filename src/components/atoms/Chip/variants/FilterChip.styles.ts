import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { chipTokens } from '../Chip.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filter-chip.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-filter-chip.scss

export const filterChipStyles = stylex.create({
  host: {
    [chipTokens.flatContainerColor]: colorRolesVars.surfaceContainerLow,

    [chipTokens.selectedFlatContainerColor]: colorRolesVars.secondaryContainer,
    [chipTokens.selectedFlatContainerColor$disabled]: colorRolesVars.onSurface,

    [chipTokens.selectedOutlineWidth]: '0',

    [chipTokens.selectedElevatedContainerColor]:
      colorRolesVars.secondaryContainer,

    [chipTokens.selectedLabelTextColor]: colorRolesVars.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$hover]:
      colorRolesVars.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$focus]:
      colorRolesVars.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$pressed]:
      colorRolesVars.onSecondaryContainer,

    [chipTokens.stateLayerColor$hover]: colorRolesVars.onSurfaceVariant,
    [chipTokens.stateLayerColor$pressed]: colorRolesVars.onSecondaryContainer,

    [chipTokens.selectedStateLayerColor$hover]:
      colorRolesVars.onSecondaryContainer,
    [chipTokens.selectedStateLayerColor$pressed]:
      colorRolesVars.onSurfaceVariant,

    [chipTokens.selectedIconColor]: colorRolesVars.onSecondaryContainer,
    [chipTokens.selectedIconColor$focus]: colorRolesVars.onSecondaryContainer,
    [chipTokens.selectedIconColor$hover]: colorRolesVars.onSecondaryContainer,
    [chipTokens.selectedIconColor$pressed]: colorRolesVars.onSecondaryContainer,

    [chipTokens.trailingIconColor]: colorRolesVars.onSurfaceVariant,
    [chipTokens.trailingIconColor$disabled]: colorRolesVars.onSurface,
    [chipTokens.trailingIconColor$focus]: colorRolesVars.onSurfaceVariant,
    [chipTokens.trailingIconColor$hover]: colorRolesVars.onSurfaceVariant,
    [chipTokens.trailingIconColor$pressed]: colorRolesVars.onSurfaceVariant,

    [chipTokens.selectedTrailingIconColor]: colorRolesVars.onSecondaryContainer,
    [chipTokens.selectedTrailingIconColor$focus]:
      colorRolesVars.onSecondaryContainer,
    [chipTokens.selectedTrailingIconColor$hover]:
      colorRolesVars.onSecondaryContainer,
    [chipTokens.selectedTrailingIconColor$pressed]:
      colorRolesVars.onSecondaryContainer,
  },
});
