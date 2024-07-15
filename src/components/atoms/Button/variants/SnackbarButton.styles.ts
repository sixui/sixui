import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
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
    [buttonTokens.containerShape]: shapeTokens.corner$xs,

    [buttonTokens.stateLayerColor$hover]: colorRolesTokens.inversePrimary,
    [buttonTokens.stateLayerColor$pressed]: colorRolesTokens.inversePrimary,

    [buttonTokens.labelTextColor]: colorRolesTokens.inversePrimary,
    [buttonTokens.labelTextColor$focus]: colorRolesTokens.inversePrimary,
    [buttonTokens.labelTextColor$hover]: colorRolesTokens.inversePrimary,
    [buttonTokens.labelTextColor$pressed]: colorRolesTokens.inversePrimary,
    [buttonTokens.labelTextColor$disabled]: colorRolesTokens.inversePrimary,

    [buttonTokens.iconColor]: colorRolesTokens.inversePrimary,
    [buttonTokens.iconColor$focus]: colorRolesTokens.inversePrimary,
    [buttonTokens.iconColor$hover]: colorRolesTokens.inversePrimary,
    [buttonTokens.iconColor$pressed]: colorRolesTokens.inversePrimary,
    [buttonTokens.iconColor$disabled]: colorRolesTokens.inversePrimary,

    [buttonTokens.outlineColor]: colorRolesTokens.outline,
    [buttonTokens.outlineWidth]: '1px',
    [buttonTokens.outlineColor$pressed]: colorRolesTokens.outline,
  },
});
