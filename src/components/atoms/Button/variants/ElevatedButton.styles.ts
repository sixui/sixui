import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { buttonTokens } from '../Button.stylex';

export const elevatedButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorRolesVars.surfaceContainerLow,
    [buttonTokens.containerElevation]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerColor$disabled]: colorRolesVars.onSurface,
    [buttonTokens.containerElevation$disabled]:
      elevationTokens.boxShadow$level0,
    [buttonTokens.containerOpacity$disabled]:
      stateVars.containerOpacity$disabled,
    [buttonTokens.containerElevation$focus]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerElevation$hover]: elevationTokens.boxShadow$level2,
    [buttonTokens.containerElevation$pressed]: elevationTokens.boxShadow$level1,

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
