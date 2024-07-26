import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { elevationTokens } from '~/components/Elevation/Elevation.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { buttonTokens } from '../Button.stylex';

export const dangerButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorSchemeTokens.errorContainer,
    [buttonTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerColor$disabled]: colorSchemeTokens.onErrorContainer,
    [buttonTokens.containerElevation$disabled]:
      elevationTokens.boxShadow$level0,
    [buttonTokens.containerOpacity$disabled]:
      stateTokens.containerOpacity$disabled,
    [buttonTokens.containerElevation$focus]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation$hover]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerElevation$pressed]: elevationTokens.boxShadow$level0,

    [buttonTokens.stateLayerColor$hover]: colorSchemeTokens.onErrorContainer,
    [buttonTokens.stateLayerColor$pressed]: colorSchemeTokens.error,

    [buttonTokens.labelTextColor]: colorSchemeTokens.onErrorContainer,
    [buttonTokens.labelTextColor$focus]: colorSchemeTokens.onErrorContainer,
    [buttonTokens.labelTextColor$hover]: colorSchemeTokens.onErrorContainer,
    [buttonTokens.labelTextColor$pressed]: colorSchemeTokens.onErrorContainer,

    [buttonTokens.iconColor]: colorSchemeTokens.onErrorContainer,
    [buttonTokens.iconColor$focus]: colorSchemeTokens.onErrorContainer,
    [buttonTokens.iconColor$hover]: colorSchemeTokens.onErrorContainer,
    [buttonTokens.iconColor$pressed]: colorSchemeTokens.onErrorContainer,
  },
});
