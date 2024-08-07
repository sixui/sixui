import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { buttonTokens } from '../Button.stylex';

export const textButtonStyles = stylex.create({
  host: {
    [buttonTokens.leadingSpace]: spacingTokens.padding$3,
    [buttonTokens.trailingSpace]: spacingTokens.padding$3,
    [buttonTokens.leadingIconLeadingSpace]: spacingTokens.padding$3,
    [buttonTokens.leadingIconTrailingSpace]: spacingTokens.padding$4,
    [buttonTokens.trailingIconLeadingSpace]: spacingTokens.padding$4,
    [buttonTokens.trailingIconTrailingSpace]: spacingTokens.padding$3,

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
