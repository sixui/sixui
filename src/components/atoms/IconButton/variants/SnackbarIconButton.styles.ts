import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const snackbarIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerWidth]: '32px',
    [iconButtonTokens.containerHeight]: '32px',
    [iconButtonTokens.containerColor]: 'transparent',
    [iconButtonTokens.containerColor$disabled]: 'transparent',

    [iconButtonTokens.unselectedContainerColor]: 'transparent',

    [iconButtonTokens.selectedContainerColor]: 'transparent',

    [iconButtonTokens.iconColor]: colorRolesVars.inverseOnSurface,
    [iconButtonTokens.iconColor$focus]: colorRolesVars.inverseOnSurface,
    [iconButtonTokens.iconColor$hover]: colorRolesVars.inverseOnSurface,
    [iconButtonTokens.iconColor$pressed]: colorRolesVars.inverseOnSurface,

    [iconButtonTokens.toggleIconColor]: colorRolesVars.inverseOnSurface,
    [iconButtonTokens.toggleIconColor$focus]: colorRolesVars.inverseOnSurface,
    [iconButtonTokens.toggleIconColor$hover]: colorRolesVars.inverseOnSurface,
    [iconButtonTokens.toggleIconColor$pressed]: colorRolesVars.inverseOnSurface,

    [iconButtonTokens.toggleSelectedIconColor]: colorRolesVars.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$focus]:
      colorRolesVars.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$hover]:
      colorRolesVars.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorRolesVars.inverseOnSurface,

    [iconButtonTokens.stateLayerColor$hover]: colorRolesVars.inverseOnSurface,
    [iconButtonTokens.stateLayerColor$pressed]: colorRolesVars.inverseOnSurface,

    [iconButtonTokens.toggleStateLayerColor$hover]:
      colorRolesVars.inverseOnSurface,
    [iconButtonTokens.toggleStateLayerColor$pressed]:
      colorRolesVars.inverseOnSurface,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorRolesVars.inverseOnSurface,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorRolesVars.inverseOnSurface,
  },
});
