import stylex from '@stylexjs/stylex';

import { buttonTokens } from '../Button/Button.stylex';
import { elevationTokens } from '../Elevation/Elevation.stylex';
import { iconButtonTokens } from './IconButton.stylex';

// https://github.com/material-components/material-web/blob/main/iconbutton/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/iconbutton/internal/_icon-button.scss

export type IIconButtonStylesKey = keyof typeof iconButtonStyles;
export const iconButtonStyles = stylex.create({
  host: {
    width: iconButtonTokens.containerSize,
    flexShrink: 0,

    [buttonTokens.leadingSpace]: '0px',
    [buttonTokens.trailingSpace]: '0px',
    [buttonTokens.leadingIconLeadingSpace]: '0px',
    [buttonTokens.leadingIconTrailingSpace]: '0px',
    [buttonTokens.trailingIconLeadingSpace]: '0px',
    [buttonTokens.trailingIconTrailingSpace]: '0px',

    [buttonTokens.containerElevation$disabled]:
      elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation$focus]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation$hover]: elevationTokens.boxShadow$level0,
    [buttonTokens.containerElevation$pressed]: elevationTokens.boxShadow$level0,

    [buttonTokens.containerHeight]: iconButtonTokens.containerSize,
    [buttonTokens.containerShape]: iconButtonTokens.containerShape,
    [buttonTokens.containerOpacity$disabled]:
      iconButtonTokens.containerOpacity$disabled,
    [buttonTokens.containerColor]: iconButtonTokens.containerColor,
    [buttonTokens.containerColor$disabled]:
      iconButtonTokens.containerColor$disabled,
    [buttonTokens.iconSize]: iconButtonTokens.iconSize,
    [buttonTokens.labelTextLineHeight]: iconButtonTokens.iconSize,
    [buttonTokens.iconColor$disabled]: iconButtonTokens.iconColor$disabled,
    [buttonTokens.iconOpacity$disabled]: iconButtonTokens.iconOpacity$disabled,
    [buttonTokens.stateLayerOpacity$hover]:
      iconButtonTokens.stateLayerOpacity$hover,
    [buttonTokens.stateLayerOpacity$pressed]:
      iconButtonTokens.stateLayerOpacity$pressed,
    [buttonTokens.iconColor]: iconButtonTokens.iconColor,
    [buttonTokens.iconColor$hover]: iconButtonTokens.iconColor$hover,
    [buttonTokens.iconColor$focus]: iconButtonTokens.iconColor$focus,
    [buttonTokens.iconColor$pressed]: iconButtonTokens.iconColor$pressed,
    [buttonTokens.stateLayerColor$hover]:
      iconButtonTokens.stateLayerColor$hover,
    [buttonTokens.stateLayerColor$pressed]:
      iconButtonTokens.stateLayerColor$pressed,
    [buttonTokens.outlineStyle]: iconButtonTokens.outlineStyle,
    [buttonTokens.outlineWidth]: iconButtonTokens.outlineWidth,
    [buttonTokens.outlineWidth]: iconButtonTokens.outlineWidth,
    [buttonTokens.outlineColor]: iconButtonTokens.outlineColor,
    [buttonTokens.outlineColor$disabled]:
      iconButtonTokens.outlineColor$disabled,
    [buttonTokens.outlineOpacity$disabled]:
      iconButtonTokens.outlineOpacity$disabled,
    [buttonTokens.outlineColor$focus]: iconButtonTokens.outlineColor$focus,
    [buttonTokens.outlineColor$pressed]: iconButtonTokens.outlineColor$pressed,
  },
  host$toggle: {
    [buttonTokens.stateLayerColor$hover]:
      iconButtonTokens.toggleStateLayerColor$hover,
    [buttonTokens.stateLayerColor$pressed]:
      iconButtonTokens.toggleStateLayerColor$pressed,
    [buttonTokens.containerColor]: iconButtonTokens.unselectedContainerColor,
    [buttonTokens.iconColor]: iconButtonTokens.toggleIconColor,
    [buttonTokens.iconColor$hover]: iconButtonTokens.toggleIconColor$hover,
    [buttonTokens.iconColor$focus]: iconButtonTokens.toggleIconColor$focus,
    [buttonTokens.iconColor$pressed]: iconButtonTokens.toggleIconColor$pressed,
  },
  host$toggle$selected: {
    [buttonTokens.stateLayerColor$hover]:
      iconButtonTokens.toggleSelectedStateLayerColor$hover,
    [buttonTokens.stateLayerColor$pressed]:
      iconButtonTokens.toggleSelectedStateLayerColor$pressed,
    [buttonTokens.containerColor]: iconButtonTokens.selectedContainerColor,
    [buttonTokens.iconColor]: iconButtonTokens.toggleSelectedIconColor,
    [buttonTokens.iconColor$hover]:
      iconButtonTokens.toggleSelectedIconColor$hover,
    [buttonTokens.iconColor$focus]:
      iconButtonTokens.toggleSelectedIconColor$focus,
    [buttonTokens.iconColor$pressed]:
      iconButtonTokens.toggleSelectedIconColor$pressed,
  },
});
