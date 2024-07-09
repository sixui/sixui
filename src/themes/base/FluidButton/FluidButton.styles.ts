import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IFluidButtonStyleKey } from '@/components/atoms/FluidButton';
import type { IButtonBaseStyleKey } from '@/components/atoms/ButtonBase';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { IStateLayerStyleKey } from '@/components/utils/StateLayer';
import { componentVars as focusRingVars } from '@/themes/base/FocusRing/FocusRing.stylex';
import { componentVars as vars } from './FluidButton.stylex';
import { componentVars as statelayerVars } from '../StateLayer/StateLayer.stylex';

type IFluidButtonStyles = IStyles<IFluidButtonStyleKey>;
export const styles: MapNamespaces<IFluidButtonStyles> = stylex.create<
  IStyles<IFluidButtonStyleKey>
>({
  textLabel: {
    color: vars.labelTextColor,
    textDecoration: 'underline',
  },
  textLabel$disabled: {
    color: vars.labelTextColor$disabled,
    opacity: vars.labelTextOpacity$disabled,
    textDecoration: 'none',
  },
});

type IButtonBaseStyles = IStyles<IButtonBaseStyleKey>;
export const buttonBaseStyles: MapNamespaces<IButtonBaseStyles> = stylex.create<
  IStyles<IButtonBaseStyleKey>
>({
  host: {
    display: 'inline-flex',
    minWidth: '1em',
    height: '1em',
    verticalAlign: 'baseline',
    alignItems: 'center',
    borderRadius: vars.containerShape,
  },
  background: {
    backgroundColor: vars.containerColor,
  },
  background$disabled: {
    backgroundColor: vars.containerColor$disabled,
    opacity: vars.containerOpacity$disabled,
  },
  touchTarget: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `calc(100% + ${vars.touchTargetSpace})`,
    height: `calc(100% + ${vars.touchTargetSpace})`,
    transform: 'translate(-50%, -50%)',
    transformOrigin: 'center',
    borderRadius: vars.containerShape,
  },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const focusRingStyles: MapNamespaces<IFocusRingStyles> = stylex.create<
  IStyles<IFocusRingStyleKey>
>({
  host$outward: {
    [focusRingVars.shape]: vars.containerShape,
    inset: `calc(-0.5 * ${vars.stateLayerSpace} - ${vars.focusRingOutwardOffset})`,
  },
});

type IStateLayerStyles = IStyles<IStateLayerStyleKey>;
export const stateLayerStyles: MapNamespaces<IStateLayerStyles> = stylex.create<
  IStyles<IStateLayerStyleKey>
>({
  host: {
    borderRadius: vars.containerShape,
    inset: `calc(-0.5 * ${vars.stateLayerSpace})`,
    [statelayerVars.color$hover]: vars.stateLayerColor$hover,
    [statelayerVars.opacity$hover]: vars.stateLayerOpacity$hover,
    [statelayerVars.color$pressed]: vars.stateLayerColor$pressed,
    [statelayerVars.opacity$pressed]: vars.stateLayerOpacity$pressed,
  },
});
