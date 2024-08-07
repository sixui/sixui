import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { buttonTokens } from '../Button.stylex';

export const snackbarButtonStyles = stylex.create({
  host: {
    [buttonTokens.leadingSpace]: spacingTokens.padding$4,
    [buttonTokens.trailingSpace]: spacingTokens.padding$4,
    [buttonTokens.leadingIconLeadingSpace]: spacingTokens.padding$3,
    [buttonTokens.leadingIconTrailingSpace]: spacingTokens.padding$4,
    [buttonTokens.trailingIconLeadingSpace]: spacingTokens.padding$4,
    [buttonTokens.trailingIconTrailingSpace]: spacingTokens.padding$3,

    [buttonTokens.containerHeight]: `calc(32px * ${scaleTokens.scale})`,
    [buttonTokens.containerColor]: 'transparent',
    [buttonTokens.containerShape]: shapeTokens.corner$xs,

    [buttonTokens.stateLayerColor$hover]: colorSchemeTokens.inversePrimary,
    [buttonTokens.stateLayerColor$pressed]: colorSchemeTokens.inversePrimary,

    [buttonTokens.labelTextColor]: colorSchemeTokens.inversePrimary,
    [buttonTokens.labelTextColor$focus]: colorSchemeTokens.inversePrimary,
    [buttonTokens.labelTextColor$hover]: colorSchemeTokens.inversePrimary,
    [buttonTokens.labelTextColor$pressed]: colorSchemeTokens.inversePrimary,
    [buttonTokens.labelTextColor$disabled]: colorSchemeTokens.inversePrimary,

    [buttonTokens.iconColor]: colorSchemeTokens.inversePrimary,
    [buttonTokens.iconColor$focus]: colorSchemeTokens.inversePrimary,
    [buttonTokens.iconColor$hover]: colorSchemeTokens.inversePrimary,
    [buttonTokens.iconColor$pressed]: colorSchemeTokens.inversePrimary,
    [buttonTokens.iconColor$disabled]: colorSchemeTokens.inversePrimary,
  },
});
