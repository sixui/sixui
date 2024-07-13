import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { componentVars as elevationVars } from '@/themes/base/Elevation/Elevation.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { buttonTokens } from '../Button.stylex';

export const filledTonalButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorRolesVars.secondaryContainer,
    [buttonTokens.containerElevation]: elevationVars.boxShadow$level0,
    [buttonTokens.containerColor$disabled]: colorRolesVars.onSurface,
    [buttonTokens.containerElevation$disabled]: elevationVars.boxShadow$level0,
    [buttonTokens.containerOpacity$disabled]:
      stateVars.containerOpacity$disabled,
    [buttonTokens.containerElevation$focus]: elevationVars.boxShadow$level0,
    [buttonTokens.containerElevation$hover]: elevationVars.boxShadow$level1,
    [buttonTokens.containerElevation$pressed]: elevationVars.boxShadow$level0,

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
