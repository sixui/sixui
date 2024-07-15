import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { buttonTokens } from '../Button.stylex';

export const outlinedButtonStyles = stylex.create({
  host: {
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

    [buttonTokens.outlineStyle]: 'solid',
  },
});
