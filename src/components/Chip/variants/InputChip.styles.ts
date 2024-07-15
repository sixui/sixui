import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { chipTokens } from '../Chip.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-input-chip.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-input-chip.scss

export const inputChipStyles = stylex.create({
  host: {
    [chipTokens.flatContainerColor]: colorRolesTokens.surfaceContainerLow,

    [chipTokens.selectedFlatContainerColor]:
      colorRolesTokens.secondaryContainer,
    [chipTokens.selectedFlatContainerColor$disabled]:
      colorRolesTokens.onSurface,

    [chipTokens.selectedOutlineWidth]: '0',

    [chipTokens.selectedLabelTextColor]: colorRolesTokens.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$hover]:
      colorRolesTokens.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$focus]:
      colorRolesTokens.onSecondaryContainer,
    [chipTokens.selectedLabelTextColor$pressed]:
      colorRolesTokens.onSecondaryContainer,

    [chipTokens.stateLayerColor$hover]: colorRolesTokens.onSurfaceVariant,
    [chipTokens.stateLayerColor$pressed]: colorRolesTokens.onSurfaceVariant,

    [chipTokens.selectedStateLayerColor$hover]:
      colorRolesTokens.onSecondaryContainer,
    [chipTokens.selectedStateLayerColor$pressed]:
      colorRolesTokens.onSecondaryContainer,

    [chipTokens.selectedIconColor]: colorRolesTokens.primary,
    [chipTokens.selectedIconColor$focus]: colorRolesTokens.primary,
    [chipTokens.selectedIconColor$hover]: colorRolesTokens.primary,
    [chipTokens.selectedIconColor$pressed]: colorRolesTokens.primary,

    [chipTokens.trailingIconTrailingSpace]: '8px',

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

    [chipTokens.avatarShape]: shapeTokens.corner$full,
    [chipTokens.avatarSize]: '24px',
  },
});
