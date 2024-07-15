import stylex from '@stylexjs/stylex';

import { elevationTokens } from '@/components/utils/Elevation/Elevation.stylex';
import { focusRingTokens } from '@/components/utils/FocusRing/FocusRing.stylex';
import { componentVars as statelayerVars } from '@/themes/base/StateLayer/StateLayer.stylex';
import { tabTokens } from './Tab.stylex';
import { tabStateTokens } from './Tab.state.stylex';

// https://github.com/material-components/material-web/blob/main/tabs/internal/_tab.scss

export type ITabStylesKey = keyof typeof tabStyles;
export const tabStyles = stylex.create({
  host: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',

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

    [tabStateTokens.stateLayerColor$hover]: tabTokens.stateLayerColor$hover,
    [tabStateTokens.stateLayerOpacity$hover]: tabTokens.stateLayerOpacity$hover,
    [tabStateTokens.stateLayerColor$pressed]: tabTokens.stateLayerColor$pressed,
    [tabStateTokens.stateLayerOpacity$pressed]:
      tabTokens.stateLayerOpacity$pressed,
  },
  host$disabled: {
    cursor: 'default',
    pointerEvents: 'none',
    [tabStateTokens.elevation]: tabTokens.containerElevation$disabled,
  },
  host$active: {
    [tabStateTokens.stateLayerColor$hover]:
      tabTokens.activeStateLayerColor$hover,
    [tabStateTokens.stateLayerOpacity$hover]:
      tabTokens.activeStateLayerOpacity$hover,
    [tabStateTokens.stateLayerColor$pressed]:
      tabTokens.activeStateLayerColor$pressed,
    [tabStateTokens.stateLayerOpacity$pressed]:
      tabTokens.activeStateLayerOpacity$pressed,
  },
  labelContainer: {
    display: 'flex',
    gap: 4,
    alignItems: 'center',
  },
  label: {
    fontFamily: tabTokens.labelTextFont,
    fontSize: tabTokens.labelTextSize,
    fontWeight: tabTokens.labelTextWeight,
    lineHeight: tabTokens.labelTextLineHeight,
    letterSpacing: tabTokens.labelTextLetterSpacing,

    color: {
      default: tabTokens.labelTextColor,
      ':is([data-focused])': tabTokens.labelTextColor$focus,
      ':is([data-hovered])': tabTokens.labelTextColor$hover,
      ':is([data-pressed])': tabTokens.labelTextColor$pressed,
    },
  },
  label$active: {
    color: {
      default: tabTokens.activeLabelTextColor,
      ':is([data-focused])': tabTokens.activeLabelTextColor$focus,
      ':is([data-hovered])': tabTokens.activeLabelTextColor$hover,
      ':is([data-pressed])': tabTokens.activeLabelTextColor$pressed,
    },
  },
  label$disabled: {
    color: tabTokens.labelTextColor$disabled,
    opacity: tabTokens.labelTextOpacity$disabled,
  },
  background: {
    backgroundColor: tabTokens.containerColor,
    inset: 0,
    position: 'absolute',
    zIndex: -1,
    borderRadius: 'inherit',
  },
  background$disabled: {
    backgroundColor: tabTokens.containerColor$disabled,
    opacity: tabTokens.containerOpacity$disabled,
  },
  content: {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: tabTokens.containerHeight,
    gap: 8,
  },
  content$stacked: {},
  content$stacked$hasIcon$hasLabel: {},
  indicator: {
    position: 'absolute',
    transformOrigin: 'left bottom',
    backgroundColor: tabTokens.activeIndicatorColor,
    borderRadius: tabTokens.activeIndicatorShape,
    height: tabTokens.activeIndicatorHeight,
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
    fontSize: tabTokens.iconSize,
    width: tabTokens.iconSize,
    height: tabTokens.iconSize,
    color: {
      default: tabTokens.iconColor,
      ':is([data-focused])': tabTokens.iconColor$focus,
      ':is([data-hovered])': tabTokens.iconColor$hover,
      ':is([data-pressed])': tabTokens.iconColor$pressed,
    },
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon$disabled: {
    color: tabTokens.iconColor$disabled,
    opacity: tabTokens.iconOpacity$disabled,
  },
  icon$active: {
    color: {
      default: tabTokens.activeIconColor,
      ':is([data-focused])': tabTokens.activeIconColor$focus,
      ':is([data-hovered])': tabTokens.activeIconColor$hover,
      ':is([data-pressed])': tabTokens.activeIconColor$pressed,
    },
  },
});

export const tabStateLayerStyles = stylex.create({
  host: {
    borderRadius: tabTokens.containerShape,

    [statelayerVars.color$hover]: tabStateTokens.stateLayerColor$hover,
    [statelayerVars.opacity$hover]: tabStateTokens.stateLayerOpacity$hover,
    [statelayerVars.color$pressed]: tabStateTokens.stateLayerColor$pressed,
    [statelayerVars.opacity$pressed]: tabStateTokens.stateLayerOpacity$pressed,
  },
});

export const tabFocusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]: 8,
    zIndex: 1,
  },
  host$outward: {
    inset: '-1px',
  },
});

export const tabElevationStyles = stylex.create({
  host: {
    borderRadius: tabTokens.containerShape,

    [elevationTokens.boxShadow]: tabTokens.containerElevation,
  },
});
