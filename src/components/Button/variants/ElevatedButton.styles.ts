import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { elevationTokens } from '../../Elevation/Elevation.stylex';
import { buttonTokens } from '../Button.stylex';

export const elevatedButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorSchemeTokens.surfaceContainerLow,
    [buttonTokens.containerColor$disabled]: colorSchemeTokens.onSurface,
    [buttonTokens.containerOpacity$disabled]:
      stateTokens.containerOpacity$disabled,

    [buttonTokens.containerElevation]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerElevation$focus]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerElevation$hover]: elevationTokens.boxShadow$level2,
    [buttonTokens.containerElevation$pressed]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerElevation$disabled]:
      elevationTokens.boxShadow$level0,

    [buttonTokens.stateLayerColor$hover]: colorSchemeTokens.primary,
    [buttonTokens.stateLayerColor$pressed]: colorSchemeTokens.primary,

    [buttonTokens.labelTextColor]: colorSchemeTokens.primary,
    [buttonTokens.labelTextColor$focus]: colorSchemeTokens.primary,
    [buttonTokens.labelTextColor$hover]: colorSchemeTokens.primary,
    [buttonTokens.labelTextColor$pressed]: colorSchemeTokens.primary,

    [buttonTokens.iconColor]: colorSchemeTokens.primary,
    [buttonTokens.iconColor$focus]: colorSchemeTokens.primary,
    [buttonTokens.iconColor$hover]: colorSchemeTokens.primary,
    [buttonTokens.iconColor$pressed]: colorSchemeTokens.primary,
  },
});
