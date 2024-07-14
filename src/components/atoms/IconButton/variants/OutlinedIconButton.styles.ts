import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { iconButtonTokens } from '../IconButton.stylex';

export const outlinedIconButtonStyles = stylex.create({
  host: {
    [iconButtonTokens.selectedContainerColor]: colorRolesVars.inverseSurface,

    [iconButtonTokens.iconColor]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.iconColor$focus]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.iconColor$hover]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.iconColor$pressed]: colorRolesVars.onSurfaceVariant,

    [iconButtonTokens.toggleIconColor]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$focus]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$hover]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.toggleIconColor$pressed]: colorRolesVars.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedIconColor]: colorRolesVars.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$focus]:
      colorRolesVars.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$hover]:
      colorRolesVars.inverseOnSurface,
    [iconButtonTokens.toggleSelectedIconColor$pressed]:
      colorRolesVars.inverseOnSurface,

    [iconButtonTokens.stateLayerColor$hover]: colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.stateLayerColor$pressed]: colorRolesVars.onSurfaceVariant,

    [iconButtonTokens.toggleStateLayerColor$hover]:
      colorRolesVars.onSurfaceVariant,
    [iconButtonTokens.toggleStateLayerColor$pressed]:
      colorRolesVars.onSurfaceVariant,

    [iconButtonTokens.toggleSelectedStateLayerColor$hover]:
      colorRolesVars.inverseOnSurface,
    [iconButtonTokens.toggleSelectedStateLayerColor$pressed]:
      colorRolesVars.inverseOnSurface,

    [iconButtonTokens.outlineStyle]: 'solid',
    [iconButtonTokens.outlineWidth]: '1px',
    [iconButtonTokens.outlineColor]: colorRolesVars.outline,
    [iconButtonTokens.outlineColor$disabled]: colorRolesVars.onSurface,
    [iconButtonTokens.outlineOpacity$disabled]:
      stateVars.outlineOpacity$disabled,
    [iconButtonTokens.outlineColor$focus]: colorRolesVars.outline,
    [iconButtonTokens.outlineColor$pressed]: colorRolesVars.outline,
  },
});
