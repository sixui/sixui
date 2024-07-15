import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { buttonTokens } from '../Button.stylex';

export const filledButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorRolesVars.primary,
    [buttonTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerColor$disabled]: colorRolesVars.onSurface,
    [buttonTokens.containerElevation$disabled]:
      elevationTokens.boxShadow$level0,
    [buttonTokens.containerOpacity$disabled]:
      stateVars.containerOpacity$disabled,
    [buttonTokens.containerElevation$focus]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation$hover]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerElevation$pressed]: elevationTokens.boxShadow$level0,

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
