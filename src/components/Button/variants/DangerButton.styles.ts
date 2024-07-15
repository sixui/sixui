import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { elevationTokens } from '@/components/Elevation/Elevation.stylex';
import { stateTokens } from '@/themes/base/state.stylex';
import { buttonTokens } from '../Button.stylex';

export const dangerButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorRolesTokens.errorContainer,
    [buttonTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerColor$disabled]: colorRolesTokens.onErrorContainer,
    [buttonTokens.containerElevation$disabled]:
      elevationTokens.boxShadow$level0,
    [buttonTokens.containerOpacity$disabled]:
      stateTokens.containerOpacity$disabled,
    [buttonTokens.containerElevation$focus]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation$hover]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerElevation$pressed]: elevationTokens.boxShadow$level0,

    [buttonTokens.stateLayerColor$hover]: colorRolesTokens.onErrorContainer,
    [buttonTokens.stateLayerColor$pressed]: colorRolesTokens.error,

    [buttonTokens.labelTextColor]: colorRolesTokens.onErrorContainer,
    [buttonTokens.labelTextColor$focus]: colorRolesTokens.onErrorContainer,
    [buttonTokens.labelTextColor$hover]: colorRolesTokens.onErrorContainer,
    [buttonTokens.labelTextColor$pressed]: colorRolesTokens.onErrorContainer,

    [buttonTokens.iconColor]: colorRolesTokens.onErrorContainer,
    [buttonTokens.iconColor$focus]: colorRolesTokens.onErrorContainer,
    [buttonTokens.iconColor$hover]: colorRolesTokens.onErrorContainer,
    [buttonTokens.iconColor$pressed]: colorRolesTokens.onErrorContainer,
  },
});
