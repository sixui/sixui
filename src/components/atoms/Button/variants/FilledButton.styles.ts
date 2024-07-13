import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { componentVars as elevationVars } from '@/themes/base/Elevation/Elevation.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { buttonTokens } from '../Button.stylex';

export const filledButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorRolesVars.primary,
    [buttonTokens.containerElevation]: elevationVars.boxShadow$level0,
    [buttonTokens.containerColor$disabled]: colorRolesVars.onSurface,
    [buttonTokens.containerElevation$disabled]: elevationVars.boxShadow$level0,
    [buttonTokens.containerOpacity$disabled]:
      stateVars.containerOpacity$disabled,
    [buttonTokens.containerElevation$focus]: elevationVars.boxShadow$level0,
    [buttonTokens.containerElevation$hover]: elevationVars.boxShadow$level1,
    [buttonTokens.containerElevation$pressed]: elevationVars.boxShadow$level0,

    [buttonTokens.stateLayerColor$hover]: colorRolesVars.onPrimary,
    [buttonTokens.stateLayerColor$pressed]: colorRolesVars.onPrimary,

    [buttonTokens.labelTextColor]: colorRolesVars.onPrimary,
    [buttonTokens.labelTextColor$focus]: colorRolesVars.onPrimary,
    [buttonTokens.labelTextColor$hover]: colorRolesVars.onPrimary,
    [buttonTokens.labelTextColor$pressed]: colorRolesVars.onPrimary,

    [buttonTokens.iconColor]: colorRolesVars.onPrimary,
    [buttonTokens.iconColor$focus]: colorRolesVars.onPrimary,
    [buttonTokens.iconColor$hover]: colorRolesVars.onPrimary,
    [buttonTokens.iconColor$pressed]: colorRolesVars.onPrimary,
  },
});
