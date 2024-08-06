import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { elevationTokens } from '../../Elevation/Elevation.stylex';
import { buttonTokens } from '../Button.stylex';

export const filledTonalButtonStyles = stylex.create({
  host: {
    [buttonTokens.containerColor]: colorSchemeTokens.secondaryContainer,
    [buttonTokens.containerColor$disabled]: colorSchemeTokens.onSurface,
    [buttonTokens.containerOpacity$disabled]:
      stateTokens.containerOpacity$disabled,

    [buttonTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation$focus]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation$hover]: elevationTokens.boxShadow$level1,
    [buttonTokens.containerElevation$pressed]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation$disabled]:
      elevationTokens.boxShadow$level0,

    [buttonTokens.stateLayerColor$hover]:
      colorSchemeTokens.onSecondaryContainer,
    [buttonTokens.stateLayerColor$pressed]:
      colorSchemeTokens.onSecondaryContainer,

    [buttonTokens.labelTextColor]: colorSchemeTokens.onSecondaryContainer,
    [buttonTokens.labelTextColor$focus]: colorSchemeTokens.onSecondaryContainer,
    [buttonTokens.labelTextColor$hover]: colorSchemeTokens.onSecondaryContainer,
    [buttonTokens.labelTextColor$pressed]:
      colorSchemeTokens.onSecondaryContainer,

    [buttonTokens.iconColor]: colorSchemeTokens.onSecondaryContainer,
    [buttonTokens.iconColor$focus]: colorSchemeTokens.onSecondaryContainer,
    [buttonTokens.iconColor$hover]: colorSchemeTokens.onSecondaryContainer,
    [buttonTokens.iconColor$pressed]: colorSchemeTokens.onSecondaryContainer,
  },
});
