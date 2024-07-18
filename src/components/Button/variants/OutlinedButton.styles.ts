import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { buttonTokens } from '../Button.stylex';

export const outlinedButtonStyles = stylex.create({
  host: {
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

    [buttonTokens.outlineStyle]: 'solid',
  },
});
