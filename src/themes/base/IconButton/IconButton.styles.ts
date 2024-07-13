import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IIconButtonStyleKey } from '@/components/atoms/IconButton';
import { componentVars as vars } from './IconButton.stylex';
import { buttonTokens as buttonVars } from '@/components/atoms/Button/Button.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';

// https://github.com/material-components/material-web/blob/main/iconbutton/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/iconbutton/internal/_icon-button.scss

type IIconButtonStyles = IStyles<IIconButtonStyleKey>;
export const styles: MapNamespaces<IIconButtonStyles> =
  stylex.create<IIconButtonStyles>({
    host: {
      width: vars.containerWidth,
      flexShrink: 0,

      [buttonVars.leadingSpace]: '0',
      [buttonVars.trailingSpace]: '0',
      [buttonVars.leadingIconLeadingSpace]: '0',
      [buttonVars.leadingIconTrailingSpace]: '0',
      [buttonVars.trailingIconLeadingSpace]: '0',
      [buttonVars.trailingIconTrailingSpace]: '0',

      [buttonVars.containerElevation$disabled]: elevationVars.boxShadow$level0,
      [buttonVars.containerElevation]: elevationVars.boxShadow$level0,
      [buttonVars.containerElevation$focus]: elevationVars.boxShadow$level0,
      [buttonVars.containerElevation$hover]: elevationVars.boxShadow$level0,
      [buttonVars.containerElevation$pressed]: elevationVars.boxShadow$level0,

      [buttonVars.containerHeight]: vars.containerHeight,
      [buttonVars.containerShape]: vars.containerShape,
      [buttonVars.containerOpacity$disabled]: vars.containerOpacity$disabled,
      [buttonVars.containerColor]: vars.containerColor,
      [buttonVars.containerColor$disabled]: vars.containerColor$disabled,
      [buttonVars.iconSize]: vars.iconSize,
      [buttonVars.labelTextLineHeight]: vars.iconSize,
      [buttonVars.iconColor$disabled]: vars.iconColor$disabled,
      [buttonVars.iconOpacity$disabled]: vars.iconOpacity$disabled,
      [buttonVars.stateLayerOpacity$hover]: vars.stateLayerOpacity$hover,
      [buttonVars.stateLayerOpacity$pressed]: vars.stateLayerOpacity$pressed,
      [buttonVars.iconColor]: vars.iconColor,
      [buttonVars.iconColor$hover]: vars.iconColor$hover,
      [buttonVars.iconColor$focus]: vars.iconColor$focus,
      [buttonVars.iconColor$pressed]: vars.iconColor$pressed,
      [buttonVars.stateLayerColor$hover]: vars.stateLayerColor$hover,
      [buttonVars.stateLayerColor$pressed]: vars.stateLayerColor$pressed,
      [buttonVars.outlineStyle]: vars.outlineStyle,
      [buttonVars.outlineWidth]: vars.outlineWidth,
      [buttonVars.outlineWidth]: vars.outlineWidth,
      [buttonVars.outlineColor]: vars.outlineColor,
      [buttonVars.outlineColor$disabled]: vars.outlineColor$disabled,
      [buttonVars.outlineOpacity$disabled]: vars.outlineOpacity$disabled,
      [buttonVars.outlineColor$focus]: vars.outlineColor$focus,
      [buttonVars.outlineColor$pressed]: vars.outlineColor$pressed,
    },
    host$toggle: {
      [buttonVars.stateLayerColor$hover]: vars.toggleStateLayerColor$hover,
      [buttonVars.stateLayerColor$pressed]: vars.toggleStateLayerColor$pressed,
      [buttonVars.containerColor]: vars.unselectedContainerColor,
      [buttonVars.iconColor]: vars.toggleIconColor,
      [buttonVars.iconColor$hover]: vars.toggleIconColor$hover,
      [buttonVars.iconColor$focus]: vars.toggleIconColor$focus,
      [buttonVars.iconColor$pressed]: vars.toggleIconColor$pressed,
    },
    host$toggle$selected: {
      [buttonVars.stateLayerColor$hover]:
        vars.toggleSelectedStateLayerColor$hover,
      [buttonVars.stateLayerColor$pressed]:
        vars.toggleSelectedStateLayerColor$pressed,
      [buttonVars.containerColor]: vars.selectedContainerColor,
      [buttonVars.iconColor]: vars.toggleSelectedIconColor,
      [buttonVars.iconColor$hover]: vars.toggleSelectedIconColor$hover,
      [buttonVars.iconColor$focus]: vars.toggleSelectedIconColor$focus,
      [buttonVars.iconColor$pressed]: vars.toggleSelectedIconColor$pressed,
    },
  });
