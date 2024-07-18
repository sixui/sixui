import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { buttonTokens } from '../Button.stylex';

export const textButtonStyles = stylex.create({
  host: {
    [buttonTokens.leadingSpace]: '12px',
    [buttonTokens.trailingSpace]: '12px',
    [buttonTokens.leadingIconLeadingSpace]: '12px',
    [buttonTokens.leadingIconTrailingSpace]: '16px',
    [buttonTokens.trailingIconLeadingSpace]: '16px',
    [buttonTokens.trailingIconTrailingSpace]: '12px',

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

    [buttonTokens.outlineColor]: colorSchemeTokens.outline,
    [buttonTokens.outlineWidth]: '1px',
    [buttonTokens.outlineColor$pressed]: colorSchemeTokens.outline,
  },
});
