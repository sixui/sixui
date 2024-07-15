import stylex from '@stylexjs/stylex';

import { buttonTokens as buttonVars } from '@/components/atoms/Button/Button.stylex';
import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { iconButtonTokens } from './IconButton.stylex';

// https://github.com/material-components/material-web/blob/main/iconbutton/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/iconbutton/internal/_icon-button.scss

export type IIconButtonStylesKey = keyof typeof iconButtonStyles;
export const iconButtonStyles = stylex.create({
  host: {
    width: iconButtonTokens.containerWidth,
    flexShrink: 0,

    [buttonVars.leadingSpace]: '0',
    [buttonVars.trailingSpace]: '0',
    [buttonVars.leadingIconLeadingSpace]: '0',
    [buttonVars.leadingIconTrailingSpace]: '0',
    [buttonVars.trailingIconLeadingSpace]: '0',
    [buttonVars.trailingIconTrailingSpace]: '0',

    [buttonVars.containerElevation$disabled]: elevationTokens.boxShadow$level0,
    [buttonVars.containerElevation]: elevationTokens.boxShadow$level0,
    [buttonVars.containerElevation$focus]: elevationTokens.boxShadow$level0,
    [buttonVars.containerElevation$hover]: elevationTokens.boxShadow$level0,
    [buttonVars.containerElevation$pressed]: elevationTokens.boxShadow$level0,

    [buttonVars.containerHeight]: iconButtonTokens.containerHeight,
    [buttonVars.containerShape]: iconButtonTokens.containerShape,
    [buttonVars.containerOpacity$disabled]:
      iconButtonTokens.containerOpacity$disabled,
    [buttonVars.containerColor]: iconButtonTokens.containerColor,
    [buttonVars.containerColor$disabled]:
      iconButtonTokens.containerColor$disabled,
    [buttonVars.iconSize]: iconButtonTokens.iconSize,
    [buttonVars.labelTextLineHeight]: iconButtonTokens.iconSize,
    [buttonVars.iconColor$disabled]: iconButtonTokens.iconColor$disabled,
    [buttonVars.iconOpacity$disabled]: iconButtonTokens.iconOpacity$disabled,
    [buttonVars.stateLayerOpacity$hover]:
      iconButtonTokens.stateLayerOpacity$hover,
    [buttonVars.stateLayerOpacity$pressed]:
      iconButtonTokens.stateLayerOpacity$pressed,
    [buttonVars.iconColor]: iconButtonTokens.iconColor,
    [buttonVars.iconColor$hover]: iconButtonTokens.iconColor$hover,
    [buttonVars.iconColor$focus]: iconButtonTokens.iconColor$focus,
    [buttonVars.iconColor$pressed]: iconButtonTokens.iconColor$pressed,
    [buttonVars.stateLayerColor$hover]: iconButtonTokens.stateLayerColor$hover,
    [buttonVars.stateLayerColor$pressed]:
      iconButtonTokens.stateLayerColor$pressed,
    [buttonVars.outlineStyle]: iconButtonTokens.outlineStyle,
    [buttonVars.outlineWidth]: iconButtonTokens.outlineWidth,
    [buttonVars.outlineWidth]: iconButtonTokens.outlineWidth,
    [buttonVars.outlineColor]: iconButtonTokens.outlineColor,
    [buttonVars.outlineColor$disabled]: iconButtonTokens.outlineColor$disabled,
    [buttonVars.outlineOpacity$disabled]:
      iconButtonTokens.outlineOpacity$disabled,
    [buttonVars.outlineColor$focus]: iconButtonTokens.outlineColor$focus,
    [buttonVars.outlineColor$pressed]: iconButtonTokens.outlineColor$pressed,
  },
  host$toggle: {
    [buttonVars.stateLayerColor$hover]:
      iconButtonTokens.toggleStateLayerColor$hover,
    [buttonVars.stateLayerColor$pressed]:
      iconButtonTokens.toggleStateLayerColor$pressed,
    [buttonVars.containerColor]: iconButtonTokens.unselectedContainerColor,
    [buttonVars.iconColor]: iconButtonTokens.toggleIconColor,
    [buttonVars.iconColor$hover]: iconButtonTokens.toggleIconColor$hover,
    [buttonVars.iconColor$focus]: iconButtonTokens.toggleIconColor$focus,
    [buttonVars.iconColor$pressed]: iconButtonTokens.toggleIconColor$pressed,
  },
  host$toggle$selected: {
    [buttonVars.stateLayerColor$hover]:
      iconButtonTokens.toggleSelectedStateLayerColor$hover,
    [buttonVars.stateLayerColor$pressed]:
      iconButtonTokens.toggleSelectedStateLayerColor$pressed,
    [buttonVars.containerColor]: iconButtonTokens.selectedContainerColor,
    [buttonVars.iconColor]: iconButtonTokens.toggleSelectedIconColor,
    [buttonVars.iconColor$hover]:
      iconButtonTokens.toggleSelectedIconColor$hover,
    [buttonVars.iconColor$focus]:
      iconButtonTokens.toggleSelectedIconColor$focus,
    [buttonVars.iconColor$pressed]:
      iconButtonTokens.toggleSelectedIconColor$pressed,
  },
});
