import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { buttonTokens } from '../Button.stylex';

export const filledTonalButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorRolesVars.secondaryContainer,
    [buttonTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerColor$disabled]: colorRolesVars.onSurface,
    [buttonTokens.containerElevation$disabled]:
      elevationTokens.boxShadow$level0,
    [buttonTokens.containerOpacity$disabled]:
      stateVars.containerOpacity$disabled,
    [buttonTokens.containerElevation$focus]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation$hover]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerElevation$pressed]: elevationTokens.boxShadow$level0,

    [buttonTokens.stateLayerColor$hover]: colorRolesVars.onSecondaryContainer,
    [buttonTokens.stateLayerColor$pressed]: colorRolesVars.onSecondaryContainer,

    [buttonTokens.labelTextColor]: colorRolesVars.onSecondaryContainer,
    [buttonTokens.labelTextColor$focus]: colorRolesVars.onSecondaryContainer,
    [buttonTokens.labelTextColor$hover]: colorRolesVars.onSecondaryContainer,
    [buttonTokens.labelTextColor$pressed]: colorRolesVars.onSecondaryContainer,

    [buttonTokens.iconColor]: colorRolesVars.onSecondaryContainer,
    [buttonTokens.iconColor$focus]: colorRolesVars.onSecondaryContainer,
    [buttonTokens.iconColor$hover]: colorRolesVars.onSecondaryContainer,
    [buttonTokens.iconColor$pressed]: colorRolesVars.onSecondaryContainer,
  },
});
