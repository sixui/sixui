import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IIconButtonStyleKey } from '@/components/atoms/IconButton';
import { componentVars as vars } from './IconButton.stylex';
import { componentVars as buttonVars } from '../Button/Button.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';

// https://github.com/material-components/material-web/blob/main/iconbutton/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/iconbutton/internal/_icon-button.scss

type IIconButtonStyles = IStyles<IIconButtonStyleKey>;
export const styles: MapNamespaces<IIconButtonStyles> =
  stylex.create<IIconButtonStyles>({
    host: {
      width: vars.containerWidth,

      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.leadingSpace]: '0',
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.trailingSpace]: '0',
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.leadingIconLeadingSpace]: '0',
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.leadingIconTrailingSpace]: '0',
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.trailingIconLeadingSpace]: '0',
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.trailingIconTrailingSpace]: '0',

      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.containerElevation$disabled]: elevationVars.boxShadow$level0,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.containerElevation]: elevationVars.boxShadow$level0,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.containerElevation$focus]: elevationVars.boxShadow$level0,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.containerElevation$hover]: elevationVars.boxShadow$level0,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.containerElevation$pressed]: elevationVars.boxShadow$level0,

      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.containerHeight]: vars.containerHeight,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.containerShape]: vars.containerShape,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.containerOpacity$disabled]: vars.containerOpacity$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.containerColor]: vars.containerColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.containerColor$disabled]: vars.containerColor$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconSize]: vars.iconSize,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconColor$disabled]: vars.iconColor$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconOpacity$disabled]: vars.iconOpacity$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.stateLayerOpacity$hover]: vars.stateLayerOpacity$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.stateLayerOpacity$pressed]: vars.stateLayerOpacity$pressed,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconColor]: vars.iconColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconColor$hover]: vars.iconColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconColor$focus]: vars.iconColor$focus,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconColor$pressed]: vars.iconColor$pressed,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.stateLayerColor$hover]: vars.stateLayerColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.stateLayerColor$pressed]: vars.stateLayerColor$pressed,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.outlineStyle]: vars.outlineStyle,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.outlineWidth]: vars.outlineWidth,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.outlineWidth]: vars.outlineWidth,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.outlineColor]: vars.outlineColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.outlineColor$disabled]: vars.outlineColor$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.outlineOpacity$disabled]: vars.outlineOpacity$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.outlineColor$focus]: vars.outlineColor$focus,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.outlineColor$pressed]: vars.outlineColor$pressed,
    },
    host$toggle: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.stateLayerColor$hover]: vars.toggleStateLayerColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.stateLayerColor$pressed]: vars.toggleStateLayerColor$pressed,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.containerColor]: vars.unselectedContainerColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconColor]: vars.toggleIconColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconColor$hover]: vars.toggleIconColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconColor$focus]: vars.toggleIconColor$focus,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconColor$pressed]: vars.toggleIconColor$pressed,
    },
    host$toggle$selected: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.stateLayerColor$hover]:
        vars.toggleSelectedStateLayerColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.stateLayerColor$pressed]:
        vars.toggleSelectedStateLayerColor$pressed,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.containerColor]: vars.selectedContainerColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconColor]: vars.toggleSelectedIconColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconColor$hover]: vars.toggleSelectedIconColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconColor$focus]: vars.toggleSelectedIconColor$focus,
      // eslint-disable-next-line @stylexjs/valid-styles
      [buttonVars.iconColor$pressed]: vars.toggleSelectedIconColor$pressed,
    },
  });
