import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const filledTonalIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerColor]: colorRolesTokens.secondaryContainer,
    [iconButtonTokens.containerColor$disabled]: colorRolesTokens.onSurface,

    [iconButtonTokens.unselectedContainerColor]:
      colorRolesTokens.surfaceContainerHighest,

    [iconButtonTokens.selectedContainerColor]:
      colorRolesTokens.secondaryContainer,

    [iconButtonTokens.iconColor]: colorRolesTokens.onSecondaryContainer,
    [iconButtonTokens.iconColor$focus]: colorRolesTokens.onSecondaryContainer,
    [iconButtonTokens.iconColor$hover]: colorRolesTokens.onSecondaryContainer,
    [iconButtonTokens.iconColor$pressed]: colorRolesTokens.onSecondaryContainer,
    [iconButtonTokens.iconColor$disabled]:
      colorRolesTokens.onSecondaryContainer,

    [iconButtonTokens.toggleIconColor]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$focus]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$hover]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$pressed]:
      colorRolesTokens.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedIconColor]:
      colorRolesTokens.onSecondaryContainer,
    [iconButtonTokens.toggleSelectedIconColor$focus]:
      colorRolesTokens.onSecondaryContainer,
    [iconButtonTokens.toggleSelectedIconColor$hover]:
      colorRolesTokens.onSecondaryContainer,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorRolesTokens.onSecondaryContainer,

    [iconButtonTokens.stateLayerColor$hover]:
      colorRolesTokens.onSecondaryContainer,
    [iconButtonTokens.stateLayerColor$pressed]:
      colorRolesTokens.onSecondaryContainer,

    [iconButtonTokens.toggleStateLayerColor$hover]:
      colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.toggleStateLayerColor$pressed]:
      colorRolesTokens.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorRolesTokens.onSecondaryContainer,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorRolesTokens.onSecondaryContainer,
  },
});
