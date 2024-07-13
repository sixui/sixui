import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { buttonTokens } from '../Button.stylex';

export const snackbarButtonStyles = stylex.create({
  host: {
    [buttonTokens.leadingSpace]: '16px',
    [buttonTokens.trailingSpace]: '16px',
    [buttonTokens.leadingIconLeadingSpace]: '12px',
    [buttonTokens.leadingIconTrailingSpace]: '16px',
    [buttonTokens.trailingIconLeadingSpace]: '16px',
    [buttonTokens.trailingIconTrailingSpace]: '12px',

    [buttonTokens.touchTargetSpace]: '12px',

    [buttonTokens.containerHeight]: '32px',
    [buttonTokens.containerColor]: 'transparent',
    [buttonTokens.containerShape]: shapeVars.corner$xs,

    [buttonTokens.stateLayerColor$hover]: colorRolesVars.inversePrimary,
    [buttonTokens.stateLayerColor$pressed]: colorRolesVars.inversePrimary,

    [buttonTokens.labelTextColor]: colorRolesVars.inversePrimary,
    [buttonTokens.labelTextColor$focus]: colorRolesVars.inversePrimary,
    [buttonTokens.labelTextColor$hover]: colorRolesVars.inversePrimary,
    [buttonTokens.labelTextColor$pressed]: colorRolesVars.inversePrimary,
    [buttonTokens.labelTextColor$disabled]: colorRolesVars.inversePrimary,

    [buttonTokens.iconColor]: colorRolesVars.inversePrimary,
    [buttonTokens.iconColor$focus]: colorRolesVars.inversePrimary,
    [buttonTokens.iconColor$hover]: colorRolesVars.inversePrimary,
    [buttonTokens.iconColor$pressed]: colorRolesVars.inversePrimary,
    [buttonTokens.iconColor$disabled]: colorRolesVars.inversePrimary,

    [buttonTokens.outlineColor]: colorRolesVars.outline,
    [buttonTokens.outlineWidth]: '1px',
    [buttonTokens.outlineColor$pressed]: colorRolesVars.outline,
  },
});
