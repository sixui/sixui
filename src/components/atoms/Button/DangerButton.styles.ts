import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { componentVars as elevationVars } from '@/themes/base/Elevation/Elevation.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { buttonTokens } from './Button.stylex';

export const dangerButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorRolesVars.errorContainer,
    [buttonTokens.containerElevation]: elevationVars.boxShadow$level0,
    [buttonTokens.containerColor$disabled]: colorRolesVars.onErrorContainer,
    [buttonTokens.containerElevation$disabled]: elevationVars.boxShadow$level0,
    [buttonTokens.containerOpacity$disabled]:
      stateVars.containerOpacity$disabled,
    [buttonTokens.containerElevation$focus]: elevationVars.boxShadow$level0,
    [buttonTokens.containerElevation$hover]: elevationVars.boxShadow$level1,
    [buttonTokens.containerElevation$pressed]: elevationVars.boxShadow$level0,

    [buttonTokens.stateLayerColor$hover]: colorRolesVars.onErrorContainer,
    [buttonTokens.stateLayerColor$pressed]: colorRolesVars.error,

    [buttonTokens.labelTextColor]: colorRolesVars.onErrorContainer,
    [buttonTokens.labelTextColor$focus]: colorRolesVars.onErrorContainer,
    [buttonTokens.labelTextColor$hover]: colorRolesVars.onErrorContainer,
    [buttonTokens.labelTextColor$pressed]: colorRolesVars.onErrorContainer,

    [buttonTokens.iconColor]: colorRolesVars.onErrorContainer,
    [buttonTokens.iconColor$focus]: colorRolesVars.onErrorContainer,
    [buttonTokens.iconColor$hover]: colorRolesVars.onErrorContainer,
    [buttonTokens.iconColor$pressed]: colorRolesVars.onErrorContainer,
  },
});
