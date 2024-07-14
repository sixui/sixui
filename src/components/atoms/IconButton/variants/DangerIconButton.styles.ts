import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const dangerIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerColor]: colorRolesVars.errorContainer,
    [iconButtonTokens.containerColor$disabled]: colorRolesVars.onErrorContainer,

    [iconButtonTokens.unselectedContainerColor]:
      colorRolesVars.surfaceContainerHighest,

    [iconButtonTokens.selectedContainerColor]: colorRolesVars.errorContainer,

    [iconButtonTokens.iconColor]: colorRolesVars.onErrorContainer,
    [iconButtonTokens.iconColor$focus]: colorRolesVars.onErrorContainer,
    [iconButtonTokens.iconColor$hover]: colorRolesVars.onErrorContainer,
    [iconButtonTokens.iconColor$pressed]: colorRolesVars.onErrorContainer,

    [iconButtonTokens.toggleIconColor]: colorRolesVars.onErrorContainer,
    [iconButtonTokens.toggleIconColor$focus]: colorRolesVars.onErrorContainer,
    [iconButtonTokens.toggleIconColor$hover]: colorRolesVars.onErrorContainer,
    [iconButtonTokens.toggleIconColor$pressed]: colorRolesVars.onErrorContainer,

    [iconButtonTokens.toggleSelectedIconColor]: colorRolesVars.onErrorContainer,
    [iconButtonTokens.toggleSelectedIconColor$focus]:
      colorRolesVars.onErrorContainer,
    [iconButtonTokens.toggleSelectedIconColor$hover]:
      colorRolesVars.onErrorContainer,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorRolesVars.onErrorContainer,

    [iconButtonTokens.stateLayerColor$hover]: colorRolesVars.onErrorContainer,
    [iconButtonTokens.stateLayerColor$pressed]: colorRolesVars.onErrorContainer,

    [iconButtonTokens.toggleStateLayerColor$hover]: colorRolesVars.error,
    [iconButtonTokens.toggleStateLayerColor$pressed]: colorRolesVars.error,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorRolesVars.onErrorContainer,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorRolesVars.onErrorContainer,
  },
});
