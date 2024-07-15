import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { stateVars } from '@/themes/base/vars/state.stylex';
import { buttonTokens } from '../Button.stylex';

export const dangerButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorRolesVars.errorContainer,
    [buttonTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerColor$disabled]: colorRolesVars.onErrorContainer,
    [buttonTokens.containerElevation$disabled]:
      elevationTokens.boxShadow$level0,
    [buttonTokens.containerOpacity$disabled]:
      stateVars.containerOpacity$disabled,
    [buttonTokens.containerElevation$focus]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation$hover]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerElevation$pressed]: elevationTokens.boxShadow$level0,

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
