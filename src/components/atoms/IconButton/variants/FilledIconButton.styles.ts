import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const filledIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerColor]: colorRolesVars.primary,
    [iconButtonTokens.containerColor$disabled]: colorRolesVars.onSurface,

    [iconButtonTokens.unselectedContainerColor]:
      colorRolesVars.surfaceContainerHighest,

    [iconButtonTokens.selectedContainerColor]: colorRolesVars.primary,

    [iconButtonTokens.iconColor]: colorRolesVars.onPrimary,
    [iconButtonTokens.iconColor$focus]: colorRolesVars.onPrimary,
    [iconButtonTokens.iconColor$hover]: colorRolesVars.onPrimary,
    [iconButtonTokens.iconColor$pressed]: colorRolesVars.onPrimary,
    [iconButtonTokens.iconColor$disabled]: colorRolesVars.onPrimary,

    [iconButtonTokens.toggleIconColor]: colorRolesVars.primary,
    [iconButtonTokens.toggleIconColor$focus]: colorRolesVars.primary,
    [iconButtonTokens.toggleIconColor$hover]: colorRolesVars.primary,
    [iconButtonTokens.toggleIconColor$pressed]: colorRolesVars.primary,

    [iconButtonTokens.toggleSelectedIconColor]: colorRolesVars.onPrimary,
    [iconButtonTokens.toggleSelectedIconColor$focus]: colorRolesVars.onPrimary,
    [iconButtonTokens.toggleSelectedIconColor$hover]: colorRolesVars.onPrimary,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorRolesVars.onPrimary,

    [iconButtonTokens.stateLayerColor$hover]: colorRolesVars.onPrimary,
    [iconButtonTokens.stateLayerColor$pressed]: colorRolesVars.onPrimary,

    [iconButtonTokens.toggleStateLayerColor$hover]: colorRolesVars.primary,
    [iconButtonTokens.toggleStateLayerColor$pressed]: colorRolesVars.primary,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorRolesVars.onPrimary,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorRolesVars.onPrimary,
  },
});
