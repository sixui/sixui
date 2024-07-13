import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { buttonTokens } from '../Button.stylex';

export const outlinedButtonStyles = stylex.create({
  host: {
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

    [buttonTokens.outlineStyle]: 'solid',
  },
});
