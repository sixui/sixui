import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const snackbarIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerWidth]: '32px',
    [iconButtonTokens.containerHeight]: '32px',
    [iconButtonTokens.containerColor]: 'transparent',
    [iconButtonTokens.containerColor$disabled]: 'transparent',

    [iconButtonTokens.unselectedContainerColor]: 'transparent',

    [iconButtonTokens.selectedContainerColor]: 'transparent',

    [iconButtonTokens.iconColor]: colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.iconColor$focus]: colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.iconColor$hover]: colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.iconColor$pressed]: colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.iconColor$disabled]: colorRolesTokens.inverseOnSurface,

    [iconButtonTokens.toggleIconColor]: colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.toggleIconColor$focus]: colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.toggleIconColor$hover]: colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.toggleIconColor$pressed]:
      colorRolesTokens.inverseOnSurface,

    [iconButtonTokens.toggleSelectedIconColor]:
      colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$focus]:
      colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$hover]:
      colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorRolesTokens.inverseOnSurface,

    [iconButtonTokens.stateLayerColor$hover]: colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.stateLayerColor$pressed]:
      colorRolesTokens.inverseOnSurface,

    [iconButtonTokens.toggleStateLayerColor$hover]:
      colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.toggleStateLayerColor$pressed]:
      colorRolesTokens.inverseOnSurface,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorRolesTokens.inverseOnSurface,
  },
});
