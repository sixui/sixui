import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { stateTokens } from '@/themes/base/tokens/state.stylex';
import { buttonTokens } from '../Button.stylex';

export const filledButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorRolesTokens.primary,
    [buttonTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerColor$disabled]: colorRolesTokens.onSurface,
    [buttonTokens.containerElevation$disabled]:
      elevationTokens.boxShadow$level0,
    [buttonTokens.containerOpacity$disabled]:
      stateTokens.containerOpacity$disabled,
    [buttonTokens.containerElevation$focus]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation$hover]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerElevation$pressed]: elevationTokens.boxShadow$level0,

    [buttonTokens.stateLayerColor$hover]: colorRolesTokens.onPrimary,
    [buttonTokens.stateLayerColor$pressed]: colorRolesTokens.onPrimary,

    [buttonTokens.labelTextColor]: colorRolesTokens.onPrimary,
    [buttonTokens.labelTextColor$focus]: colorRolesTokens.onPrimary,
    [buttonTokens.labelTextColor$hover]: colorRolesTokens.onPrimary,
    [buttonTokens.labelTextColor$pressed]: colorRolesTokens.onPrimary,

    [buttonTokens.iconColor]: colorRolesTokens.onPrimary,
    [buttonTokens.iconColor$focus]: colorRolesTokens.onPrimary,
    [buttonTokens.iconColor$hover]: colorRolesTokens.onPrimary,
    [buttonTokens.iconColor$pressed]: colorRolesTokens.onPrimary,
  },
});
