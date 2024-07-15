import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const standardIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.containerColor]: 'transparent',
    [iconButtonTokens.containerColor$disabled]: 'transparent',

    [iconButtonTokens.iconColor]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$focus]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$hover]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$pressed]: colorRolesTokens.onSurfaceVariant,

    [iconButtonTokens.toggleIconColor]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$focus]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$hover]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$pressed]:
      colorRolesTokens.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedIconColor]: colorRolesTokens.primary,
    [iconButtonTokens.toggleSelectedIconColor$focus]: colorRolesTokens.primary,
    [iconButtonTokens.toggleSelectedIconColor$hover]: colorRolesTokens.primary,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorRolesTokens.primary,

    [iconButtonTokens.stateLayerColor$hover]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.stateLayerColor$pressed]:
      colorRolesTokens.onSurfaceVariant,

    [iconButtonTokens.toggleStateLayerColor$hover]:
      colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.toggleStateLayerColor$pressed]:
      colorRolesTokens.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorRolesTokens.onSurfaceVariant,
  },
});
