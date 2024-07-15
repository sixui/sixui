import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { stateTokens } from '@/themes/base/tokens/state.stylex';
import { buttonTokens } from '../Button.stylex';

export const filledTonalButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorRolesTokens.secondaryContainer,
    [buttonTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerColor$disabled]: colorRolesTokens.onSurface,
    [buttonTokens.containerElevation$disabled]:
      elevationTokens.boxShadow$level0,
    [buttonTokens.containerOpacity$disabled]:
      stateTokens.containerOpacity$disabled,
    [buttonTokens.containerElevation$focus]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation$hover]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerElevation$pressed]: elevationTokens.boxShadow$level0,

    [buttonTokens.stateLayerColor$hover]: colorRolesTokens.onSecondaryContainer,
    [buttonTokens.stateLayerColor$pressed]:
      colorRolesTokens.onSecondaryContainer,

    [buttonTokens.labelTextColor]: colorRolesTokens.onSecondaryContainer,
    [buttonTokens.labelTextColor$focus]: colorRolesTokens.onSecondaryContainer,
    [buttonTokens.labelTextColor$hover]: colorRolesTokens.onSecondaryContainer,
    [buttonTokens.labelTextColor$pressed]:
      colorRolesTokens.onSecondaryContainer,

    [buttonTokens.iconColor]: colorRolesTokens.onSecondaryContainer,
    [buttonTokens.iconColor$focus]: colorRolesTokens.onSecondaryContainer,
    [buttonTokens.iconColor$hover]: colorRolesTokens.onSecondaryContainer,
    [buttonTokens.iconColor$pressed]: colorRolesTokens.onSecondaryContainer,
  },
});
