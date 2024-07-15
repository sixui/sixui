import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { stateTokens } from '@/themes/base/state.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const outlinedIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.selectedContainerColor]: colorRolesTokens.inverseSurface,

    [iconButtonTokens.iconColor]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$focus]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$hover]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$pressed]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.iconColor$disabled]: colorRolesTokens.onSurfaceVariant,

    [iconButtonTokens.toggleIconColor]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$focus]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$hover]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$pressed]:
      colorRolesTokens.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedIconColor]:
      colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$focus]:
      colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$hover]:
      colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorRolesTokens.inverseOnSurface,

    [iconButtonTokens.stateLayerColor$hover]: colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.stateLayerColor$pressed]:
      colorRolesTokens.onSurfaceVariant,

    [iconButtonTokens.toggleStateLayerColor$hover]:
      colorRolesTokens.onSurfaceVariant,
    [iconButtonTokens.toggleStateLayerColor$pressed]:
      colorRolesTokens.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorRolesTokens.inverseOnSurface,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorRolesTokens.inverseOnSurface,

    [iconButtonTokens.outlineStyle]: 'solid',
    [iconButtonTokens.outlineWidth]: '1px',
    [iconButtonTokens.outlineColor]: colorRolesTokens.outline,
    [iconButtonTokens.outlineColor$disabled]: colorRolesTokens.onSurface,
    [iconButtonTokens.outlineOpacity$disabled]:
      stateTokens.outlineOpacity$disabled,
    [iconButtonTokens.outlineColor$focus]: colorRolesTokens.outline,
    [iconButtonTokens.outlineColor$pressed]: colorRolesTokens.outline,
  },
});
