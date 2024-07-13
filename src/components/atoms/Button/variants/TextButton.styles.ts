import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { buttonTokens } from '../Button.stylex';

export const textButtonStyles = stylex.create({
  host: {
    [buttonTokens.leadingSpace]: '12px',
    [buttonTokens.trailingSpace]: '12px',
    [buttonTokens.leadingIconLeadingSpace]: '12px',
    [buttonTokens.leadingIconTrailingSpace]: '16px',
    [buttonTokens.trailingIconLeadingSpace]: '16px',
    [buttonTokens.trailingIconTrailingSpace]: '12px',

    [buttonTokens.stateLayerColor$hover]: colorRolesVars.primary,
    [buttonTokens.stateLayerColor$pressed]: colorRolesVars.primary,

    [buttonTokens.labelTextColor]: colorRolesVars.primary,
    [buttonTokens.labelTextColor$focus]: colorRolesVars.primary,
    [buttonTokens.labelTextColor$hover]: colorRolesVars.primary,
    [buttonTokens.labelTextColor$pressed]: colorRolesVars.primary,

    [buttonTokens.iconColor]: colorRolesVars.primary,
    [buttonTokens.iconColor$focus]: colorRolesVars.primary,
    [buttonTokens.iconColor$hover]: colorRolesVars.primary,
    [buttonTokens.iconColor$pressed]: colorRolesVars.primary,

    [buttonTokens.outlineColor]: colorRolesVars.outline,
    [buttonTokens.outlineWidth]: '1px',
    [buttonTokens.outlineColor$pressed]: colorRolesVars.outline,
  },
});
