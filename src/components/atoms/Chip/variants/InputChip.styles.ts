import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { chipTokens } from '../Chip.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-input-chip.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-input-chip.scss

export const inputChipStyles = stylex.create({
  host: {
    [chipTokens.flatContainerColor]: colorRolesVars.surfaceContainerLow,

    [chipTokens.selectedFlatContainerColor]: colorRolesVars.secondaryContainer,
    [chipTokens.selectedFlatContainerColor$disabled]: colorRolesVars.onSurface,

    [chipTokens.selectedOutlineWidth]: '0',

    [chipTokens.selectedLabelTextColor]: colorRolesVars.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$hover]:
      colorRolesVars.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$focus]:
      colorRolesVars.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$pressed]:
      colorRolesVars.onSecondaryContainer,

    [chipTokens.stateLayerColor$hover]: colorRolesVars.onSurfaceVariant,
    [chipTokens.stateLayerColor$pressed]: colorRolesVars.onSurfaceVariant,

    [chipTokens.selectedStateLayerColor$hover]:
      colorRolesVars.onSecondaryContainer,
    [chipTokens.selectedStateLayerColor$pressed]:
      colorRolesVars.onSecondaryContainer,

    [chipTokens.selectedIconColor]: colorRolesVars.primary,
    [chipTokens.selectedIconColor$focus]: colorRolesVars.primary,
    [chipTokens.selectedIconColor$hover]: colorRolesVars.primary,
    [chipTokens.selectedIconColor$pressed]: colorRolesVars.primary,

    [chipTokens.trailingIconTrailingSpace]: '8px',

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

    [chipTokens.avatarShape]: shapeVars.corner$full,
    [chipTokens.avatarSize]: '24px',
  },
});
