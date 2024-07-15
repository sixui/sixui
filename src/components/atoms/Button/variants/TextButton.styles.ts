import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { buttonTokens } from '../Button.stylex';

export const textButtonStyles = stylex.create({
  host: {
    [buttonTokens.leadingSpace]: '12px',
    [buttonTokens.trailingSpace]: '12px',
    [buttonTokens.leadingIconLeadingSpace]: '12px',
    [buttonTokens.leadingIconTrailingSpace]: '16px',
    [buttonTokens.trailingIconLeadingSpace]: '16px',
    [buttonTokens.trailingIconTrailingSpace]: '12px',

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

    [buttonTokens.outlineColor]: colorRolesTokens.outline,
    [buttonTokens.outlineWidth]: '1px',
    [buttonTokens.outlineColor$pressed]: colorRolesTokens.outline,
  },
});
