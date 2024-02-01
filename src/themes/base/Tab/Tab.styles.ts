import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ITabStyleKey } from '@/components/atoms/Tab';
import type { IRippleStyleKey } from '@/components/utils/Ripple';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import { componentVars as vars } from './Tab.stylex';
import { componentVars as tabStateVars } from './Tab.states.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';
import { componentVars as rippleVars } from '../Ripple/Ripple.stylex';

// https://github.com/material-components/material-web/blob/main/tabs/internal/_tab.scss

type ITabStyles = IStyles<ITabStyleKey>;
export const styles: MapNamespaces<ITabStyles> = stylex.create<ITabStyles>({
  host: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,

    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    padding: '0 16px',
    position: 'relative',
    WebkitTapHighlightColor: 'transparent',
    verticalAlign: 'middle',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    cursor: {
      default: 'default',
      ':is([data-hovered])': 'pointer',
    },

    borderRadius: 'inherit',
    borderStyle: 'unset',
    backgroundColor: 'unset',
    textDecoration: 'none',
    paddingBlock: 0,

    // eslint-disable-next-line @stylexjs/valid-styles
    [tabStateVars.stateLayerColor$hover]: vars.stateLayerColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [tabStateVars.stateLayerOpacity$hover]: vars.stateLayerOpacity$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [tabStateVars.stateLayerColor$pressed]: vars.stateLayerColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [tabStateVars.stateLayerOpacity$pressed]: vars.stateLayerOpacity$pressed,
  },
  host$disabled: {
    cursor: 'default',
    pointerEvents: 'none',
    // eslint-disable-next-line @stylexjs/valid-styles
    [tabStateVars.elevation]: vars.containerElevation$disabled,
  },
  host$active: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [tabStateVars.stateLayerColor$hover]: vars.activeStateLayerColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [tabStateVars.stateLayerOpacity$hover]: vars.activeStateLayerOpacity$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [tabStateVars.stateLayerColor$pressed]: vars.activeStateLayerColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [tabStateVars.stateLayerOpacity$pressed]:
      vars.activeStateLayerOpacity$pressed,
  },
  label: {
    fontFamily: vars.labelTextFont,
    fontSize: vars.labelTextSize,
    fontWeight: vars.labelTextWeight,
    lineHeight: vars.labelTextLineHeight,
    letterSpacing: vars.labelTextLetterSpacing,

    color: {
      default: vars.labelTextColor,
      ':is([data-focused])': vars.labelTextColor$focus,
      ':is([data-hovered])': vars.labelTextColor$hover,
      ':is([data-pressed])': vars.labelTextColor$pressed,
    },
  },
  label$active: {
    color: {
      default: vars.activeLabelTextColor,
      ':is([data-focused])': vars.activeLabelTextColor$focus,
      ':is([data-hovered])': vars.activeLabelTextColor$hover,
      ':is([data-pressed])': vars.activeLabelTextColor$pressed,
    },
  },
  label$disabled: {
    color: vars.labelTextColor$disabled,
    opacity: vars.labelTextOpacity$disabled,
  },
  background: {
    backgroundColor: vars.containerColor,
    inset: 0,
    position: 'absolute',
    zIndex: -1,
    borderRadius: 'inherit',
  },
  background$disabled: {
    backgroundColor: vars.containerColor$disabled,
    opacity: vars.containerOpacity$disabled,
  },
  content: {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: vars.containerHeight,
    gap: '8px',
  },
  indicator: {
    position: 'absolute',
    transformOrigin: 'left bottom',
    backgroundColor: vars.activeIndicatorColor,
    borderRadius: vars.activeIndicatorShape,
    height: vars.activeIndicatorHeight,
    inset: 'auto 0 0 0',
    // hidden unless the tab is selected
    opacity: 0,
  },
  indicator$active: {
    opacity: 1,
  },
  icon: {
    display: 'inline-flex',
    position: 'relative',
    writingMode: 'horizontal-tb',
    fontSize: vars.iconSize,
    width: vars.iconSize,
    height: vars.iconSize,
    color: {
      default: vars.iconColor,
      ':is([data-focused])': vars.iconColor$focus,
      ':is([data-hovered])': vars.iconColor$hover,
      ':is([data-pressed])': vars.iconColor$pressed,
    },
  },
  icon$disabled: {
    color: vars.iconColor$disabled,
    opacity: vars.iconOpacity$disabled,
  },
  icon$active: {
    color: {
      default: vars.activeIconColor,
      ':is([data-focused])': vars.activeIconColor$focus,
      ':is([data-hovered])': vars.activeIconColor$hover,
      ':is([data-pressed])': vars.activeIconColor$pressed,
    },
  },
});

type IRippleStyles = IStyles<IRippleStyleKey>;
export const rippleStyles: MapNamespaces<IRippleStyles> = stylex.create<
  IStyles<IRippleStyleKey>
>({
  host: {
    borderRadius: vars.containerShape,

    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.color$hover]: tabStateVars.stateLayerColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.opacity$hover]: tabStateVars.stateLayerOpacity$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.color$pressed]: tabStateVars.stateLayerColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.opacity$pressed]: tabStateVars.stateLayerOpacity$pressed,
  },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const focusRingStyles: MapNamespaces<IFocusRingStyles> = stylex.create<
  IStyles<IFocusRingStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [focusRingVars.shape]: '8px',
    zIndex: 1,
  },
  host$outward: {
    inset: '-1px',
  },
});

type IElevationStyles = IStyles<IElevationStyleKey>;
export const elevationStyles: MapNamespaces<IElevationStyles> = stylex.create<
  IStyles<IElevationStyleKey>
>({
  host: {
    borderRadius: vars.containerShape,

    // eslint-disable-next-line @stylexjs/valid-styles
    [elevationVars.boxShadow]: vars.containerElevation,
  },
});
