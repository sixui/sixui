import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const filledIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerColor]: colorRolesTokens.primary,
    [iconButtonTokens.containerColor$disabled]: colorRolesTokens.onSurface,

    [iconButtonTokens.unselectedContainerColor]:
      colorRolesTokens.surfaceContainerHighest,

    [iconButtonTokens.selectedContainerColor]: colorRolesTokens.primary,

    [iconButtonTokens.iconColor]: colorRolesTokens.onPrimary,
    [iconButtonTokens.iconColor$focus]: colorRolesTokens.onPrimary,
    [iconButtonTokens.iconColor$hover]: colorRolesTokens.onPrimary,
    [iconButtonTokens.iconColor$pressed]: colorRolesTokens.onPrimary,
    [iconButtonTokens.iconColor$disabled]: colorRolesTokens.onPrimary,

    [iconButtonTokens.toggleIconColor]: colorRolesTokens.primary,
    [iconButtonTokens.toggleIconColor$focus]: colorRolesTokens.primary,
    [iconButtonTokens.toggleIconColor$hover]: colorRolesTokens.primary,
    [iconButtonTokens.toggleIconColor$pressed]: colorRolesTokens.primary,

    [iconButtonTokens.toggleSelectedIconColor]: colorRolesTokens.onPrimary,
    [iconButtonTokens.toggleSelectedIconColor$focus]:
      colorRolesTokens.onPrimary,
    [iconButtonTokens.toggleSelectedIconColor$hover]:
      colorRolesTokens.onPrimary,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorRolesTokens.onPrimary,

    [iconButtonTokens.stateLayerColor$hover]: colorRolesTokens.onPrimary,
    [iconButtonTokens.stateLayerColor$pressed]: colorRolesTokens.onPrimary,

    [iconButtonTokens.toggleStateLayerColor$hover]: colorRolesTokens.primary,
    [iconButtonTokens.toggleStateLayerColor$pressed]: colorRolesTokens.primary,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorRolesTokens.onPrimary,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorRolesTokens.onPrimary,
  },
});
