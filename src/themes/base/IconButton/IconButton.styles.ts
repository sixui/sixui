import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IIconButtonStyleKey } from '@/components/atoms/IconButton';
import type { IRippleStyleKey } from '@/components/utils/Ripple';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { ICircularProgressIndicatorStyleKey } from '@/components/atoms/CircularProgressIndicator';
import { componentVars as vars } from './IconButton.stylex';
import { componentVars as iconButtonStateVars } from './IconButton.states.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';
import { componentVars as rippleVars } from '../Ripple/Ripple.stylex';
import { componentVars as circularProgressIndicatorVars } from '../CircularProgressIndicator/CircularProgressIndicator.stylex';

// https://github.com/material-components/material-web/blob/main/iconbutton/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/iconbutton/internal/_icon-button.scss

type IIconButtonStyles = IStyles<IIconButtonStyleKey>;
export const styles: MapNamespaces<IIconButtonStyles> =
  stylex.create<IIconButtonStyles>({
    host: {
      borderRadius: vars.containerShape,
      cursor: 'pointer',
      display: 'inline-flex',
      outline: 'none',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      justifyItems: 'center',
      position: 'relative',
      width: vars.containerWidth,
      height: vars.containerHeight,

      // eslint-disable-next-line @stylexjs/valid-styles
      [iconButtonStateVars.stateLayerColor$hover]: vars.stateLayerColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [iconButtonStateVars.stateLayerOpacity$hover]:
        vars.stateLayerOpacity$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [iconButtonStateVars.stateLayerColor$pressed]:
        vars.stateLayerColor$pressed,
      // eslint-disable-next-line @stylexjs/valid-styles
      [iconButtonStateVars.stateLayerOpacity$pressed]:
        vars.stateLayerOpacity$pressed,
    },
    host$toggle: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [iconButtonStateVars.stateLayerColor$hover]:
        vars.toggleStateLayerColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [iconButtonStateVars.stateLayerColor$pressed]:
        vars.toggleStateLayerColor$pressed,
    },
    host$selected: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [iconButtonStateVars.stateLayerColor$hover]:
        vars.selectedStateLayerColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [iconButtonStateVars.stateLayerOpacity$hover]:
        vars.selectedStateLayerOpacity$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [iconButtonStateVars.stateLayerColor$pressed]:
        vars.selectedStateLayerColor$pressed,
      // eslint-disable-next-line @stylexjs/valid-styles
      [iconButtonStateVars.stateLayerOpacity$pressed]:
        vars.selectedStateLayerOpacity$pressed,
    },
    host$toggle$selected: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [iconButtonStateVars.stateLayerColor$hover]:
        vars.toggleSelectedStateLayerColor$hover,
      // eslint-disable-next-line @stylexjs/valid-styles
      [iconButtonStateVars.stateLayerColor$pressed]:
        vars.toggleSelectedStateLayerColor$pressed,
    },
    host$disabled: {
      pointerEvents: 'none',
    },
    button: {
      borderRadius: 'inherit',
      cursor: 'inherit',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: 'unset',
      outline: 'none',
      verticalAlign: 'middle',
      backgroundColor: 'unset',
      textDecoration: 'none',
      font: 'inherit',
      padding: 0,
      // Place content on top of elevation and ripple
      zIndex: 0,
      gap: 'inherit',

      [iconButtonStateVars.iconColor]: {
        default: vars.iconColor,
        ':is([data-focused])': vars.iconColor$focus,
        ':is([data-hovered])': vars.iconColor$hover,
        ':is([data-pressed])': vars.iconColor$pressed,
      },
    },
    icon: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: vars.iconSize,
      width: vars.iconSize,
      height: vars.iconSize,
      fontWeight: 'inherit',
      color: iconButtonStateVars.iconColor,
    },
    icon$toggle: {
      [iconButtonStateVars.iconColor]: {
        default: vars.toggleIconColor,
        ':is([data-focused])': vars.toggleIconColor$focus,
        ':is([data-hovered])': vars.toggleIconColor$hover,
        ':is([data-pressed])': vars.toggleIconColor$pressed,
      },
    },
    icon$toggle$selected: {
      [iconButtonStateVars.iconColor]: {
        default: vars.toggleSelectedIconColor,
        ':is([data-focused])': vars.toggleSelectedIconColor$focus,
        ':is([data-hovered])': vars.toggleSelectedIconColor$hover,
        ':is([data-pressed])': vars.toggleSelectedIconColor$pressed,
      },
    },
    icon$disabled: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [iconButtonStateVars.iconColor]: vars.iconColor$disabled,
      opacity: vars.iconOpacity$disabled,
    },
    link: {
      width: '100%',
      height: '100%',
      outline: 'none',
      position: 'absolute',
    },
    touchTarget: {
      position: 'absolute',
      width: `max(48px, 100%)`,
      height: `max(48px, 100%)`,
    },
    background: {
      // Background color. Separate node for disabled opacity styles.
      // Note: filled icon buttons have three container colors,
      // "container-color" for regular, then selected/unselected for toggle.
      backgroundColor: vars.containerColor,
      borderRadius: 'inherit',
      inset: 0,
      position: 'absolute',
    },
    background$disabled: {
      backgroundColor: vars.containerColor$disabled,
      opacity: vars.containerOpacity$disabled,
    },
    background$unselected: {
      backgroundColor: vars.unselectedContainerColor,
    },
    background$selected: {
      backgroundColor: vars.selectedContainerColor,
    },
    invisible: {
      visibility: 'hidden',
    },
    overlay: {
      display: 'flex',
      position: 'absolute',
      left: 0,
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      justifyContent: 'center',
    },
  });

type IRippleStyles = IStyles<IRippleStyleKey>;
export const rippleStyles: MapNamespaces<IRippleStyles> = stylex.create<
  IStyles<IRippleStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.color$hover]: iconButtonStateVars.stateLayerColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.opacity$hover]: iconButtonStateVars.stateLayerOpacity$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.color$pressed]: iconButtonStateVars.stateLayerColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.opacity$pressed]: iconButtonStateVars.stateLayerOpacity$pressed,
  },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const focusRingStyles: MapNamespaces<IFocusRingStyles> = stylex.create<
  IStyles<IFocusRingStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [focusRingVars.shape]: vars.containerShape,
  },
});

type ICircularProgressIndicatorStyles =
  IStyles<ICircularProgressIndicatorStyleKey>;
export const circularProgressIndicatorStyles: MapNamespaces<ICircularProgressIndicatorStyles> =
  stylex.create<ICircularProgressIndicatorStyles>({
    host: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [circularProgressIndicatorVars.color]: iconButtonStateVars.iconColor,
    },
  });
