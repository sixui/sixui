import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const filledTonalIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerColor]: colorRolesVars.secondaryContainer,
    [iconButtonTokens.containerColor$disabled]: colorRolesVars.onSurface,

    [iconButtonTokens.unselectedContainerColor]:
      colorRolesVars.surfaceContainerHighest,

    [iconButtonTokens.selectedContainerColor]:
      colorRolesVars.secondaryContainer,

    [iconButtonTokens.iconColor]: colorRolesVars.onSecondaryContainer,
    [iconButtonTokens.iconColor$focus]: colorRolesVars.onSecondaryContainer,
    [iconButtonTokens.iconColor$hover]: colorRolesVars.onSecondaryContainer,
    [iconButtonTokens.iconColor$pressed]: colorRolesVars.onSecondaryContainer,
    [iconButtonTokens.iconColor$disabled]: colorRolesVars.onSecondaryContainer,

    [iconButtonTokens.toggleIconColor]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$focus]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$hover]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$pressed]: colorRolesVars.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedIconColor]:
      colorRolesVars.onSecondaryContainer,
    [iconButtonTokens.toggleSelectedIconColor$focus]:
      colorRolesVars.onSecondaryContainer,
    [iconButtonTokens.toggleSelectedIconColor$hover]:
      colorRolesVars.onSecondaryContainer,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorRolesVars.onSecondaryContainer,

    [iconButtonTokens.stateLayerColor$hover]:
      colorRolesVars.onSecondaryContainer,
    [iconButtonTokens.stateLayerColor$pressed]:
      colorRolesVars.onSecondaryContainer,

    [iconButtonTokens.toggleStateLayerColor$hover]:
      colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.toggleStateLayerColor$pressed]:
      colorRolesVars.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorRolesVars.onSecondaryContainer,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorRolesVars.onSecondaryContainer,
  },
});
