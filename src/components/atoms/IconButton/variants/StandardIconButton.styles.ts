import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const standardIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerColor]: 'transparent',
    [iconButtonTokens.containerColor$disabled]: 'transparent',

    [iconButtonTokens.iconColor]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.iconColor$focus]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.iconColor$hover]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.iconColor$pressed]: colorRolesVars.onSurfaceVariant,

    [iconButtonTokens.toggleIconColor]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$focus]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$hover]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$pressed]: colorRolesVars.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedIconColor]: colorRolesVars.primary,
    [iconButtonTokens.toggleSelectedIconColor$focus]: colorRolesVars.primary,
    [iconButtonTokens.toggleSelectedIconColor$hover]: colorRolesVars.primary,
    [iconButtonTokens.toggleSelectedIconColor$pressed]: colorRolesVars.primary,

    [iconButtonTokens.stateLayerColor$hover]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.stateLayerColor$pressed]: colorRolesVars.onSurfaceVariant,

    [iconButtonTokens.toggleStateLayerColor$hover]:
      colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.toggleStateLayerColor$pressed]:
      colorRolesVars.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorRolesVars.onSurfaceVariant,
  },
});
