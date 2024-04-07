import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ICardStyleKey } from '@/components/atoms/Card';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import type { IStateLayerStyleKey } from '@/components/utils/StateLayer';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import { componentVars as vars } from './Card.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';
import { componentVars as statelayerVars } from '../StateLayer/StateLayer.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { componentVars as cardStateVars } from './Card.states.stylex';

// https://github.com/material-components/material-web/blob/main/labs/card/internal/_shared.scss

type ICardStyles = IStyles<ICardStyleKey>;
export const styles: MapNamespaces<ICardStyles> = stylex.create<ICardStyles>({
  host: {
    display: 'flex',
    flexDirection: 'column',
    background: 'none',
    borderStyle: 'unset',
    padding: 0,
    margin: 0,
    textAlign: 'unset',
    textDecoration: 'none',
    // hide android tap color since we have statelayer
    WebkitTapHighlightColor: 'transparent',

    borderRadius: vars.containerShape,
    position: 'relative',
    zIndex: 0,

    [cardStateVars.elevation]: {
      default: vars.containerElevation,
      ':is([data-dragged])': vars.containerElevation$dragged,
    },
    cursor: {
      default: 'inherit',
      ':is([data-dragged])': 'grabbing',
    },
  },
  host$actionable: {
    cursor: {
      default: 'pointer',
      ':is([data-dragged])': 'grabbing',
    },
    [cardStateVars.elevation]: {
      default: vars.containerElevation,
      ':is([data-focused])': vars.containerElevation$focus,
      ':is([data-hovered])': vars.containerElevation$hover,
      ':is([data-pressed])': vars.containerElevation$pressed,
      ':is([data-dragged])': vars.containerElevation$dragged,
    },
  },
  host$disabled: {
    cursor: 'default',
    pointerEvents: 'none',
    // eslint-disable-next-line @stylexjs/valid-styles
    [cardStateVars.elevation]: vars.containerElevation$disabled,
  },
  background: {
    // Background color. Separate node for disabled opacity styles.
    backgroundColor: vars.containerColor,
    borderRadius: 'inherit',
    inset: 0,
    position: 'absolute',
    zIndex: -1,
  },
  background$disabled: {
    backgroundColor: vars.containerColor$disabled,
    opacity: vars.containerOpacity$disabled,
  },
  outline: {
    zIndex: 1,
  },
});

type IElevationStyles = IStyles<IElevationStyleKey>;
export const elevationStyles: MapNamespaces<IElevationStyles> = stylex.create<
  IStyles<IElevationStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [elevationVars.boxShadow]: cardStateVars.elevation,

    borderRadius: 'inherit',
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',

    zIndex: -1,
  },
});

type IStateLayerStyles = IStyles<IStateLayerStyleKey>;
export const stateLayerStyles: MapNamespaces<IStateLayerStyles> = stylex.create<
  IStyles<IStateLayerStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [statelayerVars.color$hover]: vars.stateLayerColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [statelayerVars.opacity$hover]: vars.stateLayerOpacity$hover,

    // eslint-disable-next-line @stylexjs/valid-styles
    [statelayerVars.color$pressed]: vars.stateLayerColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [statelayerVars.opacity$pressed]: vars.stateLayerOpacity$pressed,

    // eslint-disable-next-line @stylexjs/valid-styles
    [statelayerVars.color$dragged]: vars.stateLayerColor$dragged,
    // eslint-disable-next-line @stylexjs/valid-styles
    [statelayerVars.opacity$dragged]: vars.stateLayerOpacity$dragged,

    zIndex: 1,
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
