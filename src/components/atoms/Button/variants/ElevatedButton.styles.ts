import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { componentVars as elevationVars } from '@/themes/base/Elevation/Elevation.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { buttonTokens } from '../Button.stylex';

export const elevatedButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorRolesVars.surfaceContainerLow,
    [buttonTokens.containerElevation]: elevationVars.boxShadow$level1,
    [buttonTokens.containerColor$disabled]: colorRolesVars.onSurface,
    [buttonTokens.containerElevation$disabled]: elevationVars.boxShadow$level0,
    [buttonTokens.containerOpacity$disabled]:
      stateVars.containerOpacity$disabled,
    [buttonTokens.containerElevation$focus]: elevationVars.boxShadow$level1,
    [buttonTokens.containerElevation$hover]: elevationVars.boxShadow$level2,
    [buttonTokens.containerElevation$pressed]: elevationVars.boxShadow$level1,

    [buttonTokens.stateLayerColor$hover]: colorRolesVars.primary,
    [buttonTokens.stateLayerColor$pressed]: colorRolesVars.primary,

    [buttonTokens.labelTextColor]: colorRolesVars.primary,
    [buttonTokens.labelTextColor$focus]: colorRolesVars.primary,
    [buttonTokens.labelTextColor$hover]: colorRolesVars.primary,
    [buttonTokens.labelTextColor$pressed]: colorRolesVars.primary,

    [buttonTokens.iconColor]: colorRolesVars.primary,
    [buttonTokens.iconColor$focus]: colorRolesVars.primary,
    [buttonTokens.iconColor$hover]: colorRolesVars.primary,
    [buttonTokens.iconColor$pressed]: colorRolesVars.primary,
  },
});
