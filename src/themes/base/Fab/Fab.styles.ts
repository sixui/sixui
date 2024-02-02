import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IFabStyleKey } from '@/components/atoms/Fab';
import type { IRippleStyleKey } from '@/components/utils/Ripple';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { ICircularProgressIndicatorStyleKey } from '@/components/atoms/CircularProgressIndicator';
import { componentVars as vars } from './Fab.stylex';
import { componentVars as fabStateVars } from './Fab.states.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';
import { componentVars as rippleVars } from '../Ripple/Ripple.stylex';
import { componentVars as circularProgressIndicatorVars } from '../CircularProgressIndicator/CircularProgressIndicator.stylex';

// https://github.com/material-components/material-web/blob/main/fab/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/fab/internal/_fab.scss
type IFabStyles = IStyles<IFabStyleKey>;
export const styles: MapNamespaces<IFabStyles> = stylex.create<IFabStyles>({
  host: {
    borderRadius: fabStateVars.containerShape,
    cursor: 'pointer',
    display: 'inline-flex',
    outline: 'none',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    position: 'relative',

    [fabStateVars.iconColor]: {
      default: vars.iconColor,
      ':is([data-focused])': vars.iconColor$focus,
      ':is([data-hovered])': vars.iconColor$hover,
      ':is([data-pressed])': vars.iconColor$pressed,
    },
    [fabStateVars.elevation]: {
      default: vars.containerElevation,
      ':is([data-focused])': vars.containerElevation$focus,
      ':is([data-hovered])': vars.containerElevation$hover,
      ':is([data-pressed])': vars.containerElevation$pressed,
    },
  },
  host$lowered: {
    [fabStateVars.elevation]: {
      default: vars.loweredContainerElevation,
      ':is([data-focused])': vars.loweredContainerElevation$focus,
      ':is([data-hovered])': vars.loweredContainerElevation$hover,
      ':is([data-pressed])': vars.loweredContainerElevation$pressed,
    },
  },
  host$disabled: {
    cursor: 'default',
    // eslint-disable-next-line @stylexjs/valid-styles
    [fabStateVars.elevation]: vars.containerElevation$disabled,
  },
  host$sm: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [fabStateVars.containerShape]: vars.containerShape$sm,
  },
  host$md: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [fabStateVars.containerShape]: vars.containerShape$md,
  },
  host$lg: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [fabStateVars.containerShape]: vars.containerShape$lg,
  },
  fab: {
    borderRadius: 'inherit',
    cursor: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    outline: 'none',
    verticalAlign: 'middle',
    backgroundColor: 'unset',
    textDecoration: 'none',
    width: '100%',
    height: ' 100%',
    // Required for elevation and ripple to stay below content
    zIndex: 0,
    font: 'inherit',
    padding: 0,
    gap: 'inherit',
  },
  fab$sm: {
    width: vars.containerWidth$sm,
    height: vars.containerHeight$sm,
  },
  fab$md: {
    width: vars.containerWidth$md,
    height: vars.containerHeight$md,
  },
  fab$lg: {
    width: vars.containerWidth$lg,
    height: vars.containerHeight$lg,
  },
  fab$extended: {
    width: 'inherit',
    paddingInlineStart: 16,
    paddingInlineEnd: 16,
  },
  background: {
    // Background color. Separate node for disabled opacity styles.
    backgroundColor: vars.containerColor,
    borderRadius: 'inherit',
    inset: 0,
    position: 'absolute',
  },
  background$lowered: {
    backgroundColor: vars.loweredContainerColor,
  },
  background$disabled: {
    backgroundColor: vars.containerColor$disabled,
    opacity: vars.containerOpacity$disabled,
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: fabStateVars.iconColor,
  },
  icon$sm: {
    width: vars.iconSize$sm,
    height: vars.iconSize$sm,
    fontSize: vars.iconSize$sm,
  },
  icon$md: {
    width: vars.iconSize$md,
    height: vars.iconSize$md,
    fontSize: vars.iconSize$md,
  },
  icon$lg: {
    width: vars.iconSize$lg,
    height: vars.iconSize$lg,
    fontSize: vars.iconSize$lg,
  },
  icon$extended: {
    marginInlineEnd: 12,
  },
  icon$disabled: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [fabStateVars.iconColor]: vars.iconColor$disabled,
    opacity: vars.iconOpacity$disabled,
  },
  label: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontFamily: vars.labelTextFont,
    fontSize: vars.labelTextSize,
    fontWeight: vars.labelTextWeight,
    lineHeight: vars.labelTextLineHeight,

    color: {
      default: vars.labelTextColor,
      ':is([data-focused])': vars.labelTextColor$focus,
      ':is([data-hovered])': vars.labelTextColor$hover,
      ':is([data-pressed])': vars.labelTextColor$pressed,
    },
  },
  label$disabled: {
    color: vars.labelTextColor$disabled,
    opacity: vars.labelTextOpacity$disabled,
  },
  touchTarget: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 48,
    height: 48,
    transform: 'translate(-50%, -50%)',
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
    [rippleVars.color$hover]: vars.stateLayerColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.opacity$hover]: vars.stateLayerOpacity$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.color$pressed]: vars.stateLayerColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.opacity$pressed]: vars.stateLayerOpacity$pressed,
  },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const focusRingStyles: MapNamespaces<IFocusRingStyles> = stylex.create<
  IStyles<IFocusRingStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [focusRingVars.shape]: fabStateVars.containerShape,
  },
});

type IElevationStyles = IStyles<IElevationStyleKey>;
export const elevationStyles: MapNamespaces<IElevationStyles> = stylex.create<
  IStyles<IElevationStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [elevationVars.boxShadow]: fabStateVars.elevation,
  },
});

type ICircularProgressIndicatorStyles =
  IStyles<ICircularProgressIndicatorStyleKey>;
export const circularProgressIndicatorStyles: MapNamespaces<ICircularProgressIndicatorStyles> =
  stylex.create<ICircularProgressIndicatorStyles>({
    host: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [circularProgressIndicatorVars.color]: fabStateVars.iconColor,
    },
  });
