import stylex from '@stylexjs/stylex';

import { navigationRailDestinationTokens } from './NavigationRailDestination.stylex';
import { focusRingTokens } from '../FocusRing/FocusRing.stylex';
import { stateLayerTokens } from '../StateLayer/StateLayer.stylex';
import { navigationRailDestinationStateTokens } from './NavigationRailDestination.state.stylex';

export type INavigationRailDestinationStylesKey =
  keyof typeof navigationRailDestinationStyles;
export const navigationRailDestinationStyles = stylex.create({
  host: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: navigationRailDestinationTokens.gap,
    height: navigationRailDestinationTokens.containerHeight,
    [navigationRailDestinationStateTokens.containerShape]:
      navigationRailDestinationTokens.containerShape,
    borderRadius: navigationRailDestinationStateTokens.containerShape,
  },
  host$active: {
    [navigationRailDestinationStateTokens.stateLayerColor$hover]:
      navigationRailDestinationTokens.activeStateLayerColor$hover,
    [navigationRailDestinationStateTokens.stateLayerOpacity$hover]:
      navigationRailDestinationTokens.activeStateLayerOpacity$hover,
    [navigationRailDestinationStateTokens.stateLayerColor$pressed]:
      navigationRailDestinationTokens.activeStateLayerColor$pressed,
    [navigationRailDestinationStateTokens.stateLayerOpacity$pressed]:
      navigationRailDestinationTokens.activeStateLayerOpacity$pressed,
  },
  host$inactive: {
    [navigationRailDestinationStateTokens.stateLayerColor$hover]:
      navigationRailDestinationTokens.inactiveStateLayerColor$hover,
    [navigationRailDestinationStateTokens.stateLayerOpacity$hover]:
      navigationRailDestinationTokens.inactiveStateLayerOpacity$hover,
    [navigationRailDestinationStateTokens.stateLayerColor$pressed]:
      navigationRailDestinationTokens.inactiveStateLayerColor$pressed,
    [navigationRailDestinationStateTokens.stateLayerOpacity$pressed]:
      navigationRailDestinationTokens.inactiveStateLayerOpacity$pressed,
  },
  host$noLabel: {
    [navigationRailDestinationStateTokens.containerShape]:
      navigationRailDestinationTokens.containerShape$noLabel,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: navigationRailDestinationTokens.activeIndicatorWidth,
    height: navigationRailDestinationTokens.activeIndicatorHeight,
    position: 'relative',
    borderRadius: 'inherit',
  },
  iconContainer$noLabel: {
    height: navigationRailDestinationTokens.activeIndicatorHeight$noLabel,
  },
  activeIndicator: {
    position: 'absolute',
    inset: 0,
    backgroundColor: navigationRailDestinationTokens.activeIndicatorColor,
    borderRadius: navigationRailDestinationTokens.activeIndicatorShape,
  },
  activeIndicator$noLabel: {
    borderRadius: navigationRailDestinationTokens.activeIndicatorShape$noLabel,
  },
  icon: {
    position: 'relative',
    fontSize: navigationRailDestinationTokens.iconSize,
    inlineSize: navigationRailDestinationTokens.iconSize,
    blockSize: navigationRailDestinationTokens.iconSize,
  },
  icon$active: {
    color: {
      default: navigationRailDestinationTokens.activeIconColor,
      ':is([data-focused])':
        navigationRailDestinationTokens.activeIconColor$focus,
      ':is([data-hovered])':
        navigationRailDestinationTokens.activeIconColor$hover,
      ':is([data-pressed])':
        navigationRailDestinationTokens.activeIconColor$pressed,
    },
  },
  icon$inactive: {
    color: {
      default: navigationRailDestinationTokens.inactiveIconColor,
      ':is([data-focused])':
        navigationRailDestinationTokens.inactiveIconColor$focus,
      ':is([data-hovered])':
        navigationRailDestinationTokens.inactiveIconColor$hover,
      ':is([data-pressed])':
        navigationRailDestinationTokens.inactiveIconColor$pressed,
    },
  },
  labelText: {
    fontFamily: navigationRailDestinationTokens.labelTextFont,
    lineHeight: navigationRailDestinationTokens.labelTextLineHeight,
    fontSize: navigationRailDestinationTokens.labelTextSize,
    letterSpacing: navigationRailDestinationTokens.labelTextLetterSpacing,
    fontWeight: navigationRailDestinationTokens.labelTextWeight,
  },
  labelText$active: {
    color: {
      default: navigationRailDestinationTokens.activeLabelTextColor,
      ':is([data-focused])':
        navigationRailDestinationTokens.activeLabelTextColor$focus,
      ':is([data-hovered])':
        navigationRailDestinationTokens.activeLabelTextColor$hover,
      ':is([data-pressed])':
        navigationRailDestinationTokens.activeLabelTextColor$pressed,
    },
  },
  labelText$inactive: {
    color: {
      default: navigationRailDestinationTokens.inactiveLabelTextColor,
      ':is([data-focused])':
        navigationRailDestinationTokens.inactiveLabelTextColor$focus,
      ':is([data-hovered])':
        navigationRailDestinationTokens.inactiveLabelTextColor$hover,
      ':is([data-pressed])':
        navigationRailDestinationTokens.inactiveLabelTextColor$pressed,
    },
  },
});

export const navigationRailDestinationStateLayerStyles = stylex.create({
  host: {
    [stateLayerTokens.color$hover]:
      navigationRailDestinationStateTokens.stateLayerColor$hover,
    [stateLayerTokens.opacity$hover]:
      navigationRailDestinationStateTokens.stateLayerOpacity$hover,
    [stateLayerTokens.color$pressed]:
      navigationRailDestinationStateTokens.stateLayerColor$pressed,
    [stateLayerTokens.opacity$pressed]:
      navigationRailDestinationStateTokens.stateLayerOpacity$pressed,
  },
});

export const navigationRailDestinationFocusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]:
      navigationRailDestinationStateTokens.containerShape,
  },
});
