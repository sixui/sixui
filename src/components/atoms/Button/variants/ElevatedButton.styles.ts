import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { stateTokens } from '@/themes/base/state.stylex';
import { buttonTokens } from '../Button.stylex';

export const elevatedButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorRolesTokens.surfaceContainerLow,
    [buttonTokens.containerElevation]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerColor$disabled]: colorRolesTokens.onSurface,
    [buttonTokens.containerElevation$disabled]:
      elevationTokens.boxShadow$level0,
    [buttonTokens.containerOpacity$disabled]:
      stateTokens.containerOpacity$disabled,
    [buttonTokens.containerElevation$focus]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerElevation$hover]: elevationTokens.boxShadow$level2,
    [buttonTokens.containerElevation$pressed]: elevationTokens.boxShadow$level1,

    [buttonTokens.stateLayerColor$hover]: colorRolesTokens.primary,
    [buttonTokens.stateLayerColor$pressed]: colorRolesTokens.primary,

    [buttonTokens.labelTextColor]: colorRolesTokens.primary,
    [buttonTokens.labelTextColor$focus]: colorRolesTokens.primary,
    [buttonTokens.labelTextColor$hover]: colorRolesTokens.primary,
    [buttonTokens.labelTextColor$pressed]: colorRolesTokens.primary,

    [buttonTokens.iconColor]: colorRolesTokens.primary,
    [buttonTokens.iconColor$focus]: colorRolesTokens.primary,
    [buttonTokens.iconColor$hover]: colorRolesTokens.primary,
    [buttonTokens.iconColor$pressed]: colorRolesTokens.primary,
  },
});
