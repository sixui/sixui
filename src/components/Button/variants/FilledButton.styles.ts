import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { elevationTokens } from '~/components/Elevation/Elevation.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { buttonTokens } from '../Button.stylex';

export const filledButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorSchemeTokens.primary,
    [buttonTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerColor$disabled]: colorSchemeTokens.onSurface,
    [buttonTokens.containerElevation$disabled]:
      elevationTokens.boxShadow$level0,
    [buttonTokens.containerOpacity$disabled]:
      stateTokens.containerOpacity$disabled,
    [buttonTokens.containerElevation$focus]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation$hover]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerElevation$pressed]: elevationTokens.boxShadow$level0,

    [buttonTokens.stateLayerColor$hover]: colorSchemeTokens.onPrimary,
    [buttonTokens.stateLayerColor$pressed]: colorSchemeTokens.onPrimary,

    [buttonTokens.labelTextColor]: colorSchemeTokens.onPrimary,
    [buttonTokens.labelTextColor$focus]: colorSchemeTokens.onPrimary,
    [buttonTokens.labelTextColor$hover]: colorSchemeTokens.onPrimary,
    [buttonTokens.labelTextColor$pressed]: colorSchemeTokens.onPrimary,

    [buttonTokens.iconColor]: colorSchemeTokens.onPrimary,
    [buttonTokens.iconColor$focus]: colorSchemeTokens.onPrimary,
    [buttonTokens.iconColor$hover]: colorSchemeTokens.onPrimary,
    [buttonTokens.iconColor$pressed]: colorSchemeTokens.onPrimary,
  },
});
