import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IChipStyleKey } from '@/components/atoms/Chip';
import type { IRippleStyleKey } from '@/components/utils/Ripple';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { ICircularProgressIndicatorStyleKey } from '@/components/atoms/CircularProgressIndicator';
import { componentVars as vars } from './Chip.stylex';
import { componentVars as chipStateVars } from './Chip.states.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';
import { componentVars as rippleVars } from '../Ripple/Ripple.stylex';
import { componentVars as circularProgressIndicatorVars } from '../CircularProgressIndicator/CircularProgressIndicator.stylex';

// https://github.com/material-components/material-web/blob/main/chips/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/chips/internal/_elevated.scss
type IChipStyles = IStyles<IChipStyleKey>;
export const styles: MapNamespaces<IChipStyles> = stylex.create<IChipStyles>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [chipStateVars.containerShape]: vars.containerShape,
    borderRadius: chipStateVars.containerShape,
    display: 'inline-flex',
    height: vars.containerHeight,
    cursor: 'pointer',

    [chipStateVars.iconColor]: {
      default: vars.iconColor,
      ':is([data-focused])': vars.iconColor$focus,
      ':is([data-hovered])': vars.iconColor$hover,
      ':is([data-pressed])': vars.iconColor$pressed,
    },
  },
  host$avatar: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [chipStateVars.containerShape]: `calc(${vars.containerHeight} / 2)`,
  },
  host$disabled: {
    cursor: 'pointer',
    pointerEvents: 'none',
  },
  container: {
    borderRadius: 'inherit',
    display: 'flex',
    height: '100%',
    position: 'relative',
    width: '100%',

    '::before': {
      borderRadius: 'inherit',
      content: '',
      inset: 0,
      pointerEvents: 'none',
      position: 'absolute',
    },
  },
  flatContainer: {
    '::before': {
      backgroundColor: vars.flatContainerColor,
    },
    [chipStateVars.elevation]: {
      default: vars.flatContainerElevation,
      ':is([data-focused])': vars.flatContainerElevation$focus,
      ':is([data-hovered])': vars.flatContainerElevation$hover,
      ':is([data-pressed])': vars.flatContainerElevation$pressed,
    },
  },
  flatContainer$disabled: {
    '::before': {
      backgroundColor: vars.flatContainerColor$disabled,
      opacity: vars.flatContainerOpacity$disabled,
    },
    pointerEvents: 'none',
    // eslint-disable-next-line @stylexjs/valid-styles
    [chipStateVars.elevation]: vars.flatContainerElevation$disabled,
  },
  selectedFlatContainer: {
    '::before': {
      backgroundColor: vars.selectedFlatContainerColor,
    },
    [chipStateVars.elevation]: {
      default: vars.flatContainerElevation,
      ':is([data-focused])': vars.selectedFlatContainerElevation$focus,
      ':is([data-hovered])': vars.selectedFlatContainerElevation$hover,
      ':is([data-pressed])': vars.selectedFlatContainerElevation$pressed,
    },
  },
  selectedFlatContainer$disabled: {
    '::before': {
      backgroundColor: vars.selectedFlatContainerColor$disabled,
      opacity: vars.selectedFlatContainerOpacity$disabled,
    },
    pointerEvents: 'none',
    // eslint-disable-next-line @stylexjs/valid-styles
    [chipStateVars.elevation]: vars.selectedFlatContainerElevation$disabled,
  },
  elevatedContainer: {
    '::before': {
      backgroundColor: vars.elevatedContainerColor,
    },
    [chipStateVars.elevation]: {
      default: vars.elevatedContainerElevation,
      ':is([data-focused])': vars.elevatedContainerElevation$focus,
      ':is([data-hovered])': vars.elevatedContainerElevation$hover,
      ':is([data-pressed])': vars.elevatedContainerElevation$pressed,
    },
  },
  elevatedContainer$disabled: {
    '::before': {
      backgroundColor: vars.elevatedContainerColor$disabled,
      opacity: vars.elevatedContainerOpacity$disabled,
    },
    pointerEvents: 'none',
    // eslint-disable-next-line @stylexjs/valid-styles
    [chipStateVars.elevation]: vars.elevatedContainerElevation$disabled,
  },
  selectedElevatedContainer: {
    '::before': {
      backgroundColor: vars.selectedElevatedContainerColor,
    },
    [chipStateVars.elevation]: {
      default: vars.elevatedContainerElevation,
      ':is([data-focused])': vars.elevatedContainerElevation$focus,
      ':is([data-hovered])': vars.elevatedContainerElevation$hover,
      ':is([data-pressed])': vars.elevatedContainerElevation$pressed,
    },
  },
  selectedElevatedContainer$disabled: {
    '::before': {
      backgroundColor: vars.selectedFlatContainerColor$disabled,
      opacity: vars.selectedFlatContainerOpacity$disabled,
    },
    pointerEvents: 'none',
    // eslint-disable-next-line @stylexjs/valid-styles
    [chipStateVars.elevation]: vars.selectedFlatContainerElevation$disabled,
  },
  action: {
    alignItems: 'center',
    appearance: 'none',
    backgroundColor: 'unset',
    borderStyle: 'unset',
    borderRadius: 'inherit',
    display: 'flex',
    outline: 'none',
    padding: 0,
    position: 'relative',
    textDecoration: 'none',
    cursor: 'inherit',
  },
  action$trailing: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingInlineStart: vars.iconLabelSpace,
    paddingInlineEnd: vars.trailingIconTrailingSpace,
  },
  action$primary: {
    paddingInlineStart: vars.leadingSpace,
    paddingInlineEnd: vars.trailingSpace,
  },
  action$primary$hasLeading: {
    paddingInlineStart: vars.iconLeadingSpace,
  },
  action$primary$hasTrailing: {
    paddingInlineEnd: 0,
  },
  action$primary$avatar: {
    paddingInlineStart: 4,
  },
  touchTarget: {
    // Place content above background elements
    zIndex: 1,
    height: 48,
    inset: '50% 0 0',
    position: 'absolute',
    transform: 'translateY(-50%)',
    width: '100%',
  },
  outline: {
    borderWidth: vars.outlineWidth,
    borderStyle: 'solid',
    borderRadius: 'inherit',
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',

    borderColor: {
      default: vars.outlineColor,
      ':is([data-focused])': vars.outlineColor$focus,
      ':is([data-pressed])': vars.outlineColor$pressed,
    },
  },
  outline$selected: {
    borderWidth: vars.selectedOutlineWidth,
  },
  outline$disabled: {
    borderColor: vars.outlineColor$disabled,
    opacity: vars.outlineOpacity$disabled,
  },
  label: {
    // Place content above background elements
    zIndex: 1,
    alignItems: 'center',
    display: 'flex',
    fontFamily: vars.labelTextFont,
    fontSize: vars.labelTextSize,
    lineHeight: vars.labelTextLineHeight,
    letterSpacing: vars.labelTextLetterSpacing,
    fontWeight: vars.labelTextWeight,
    height: '100%',
    textOverflow: 'ellipsis',
    userSelect: 'none',
    whiteSpace: 'nowrap',

    color: {
      default: vars.labelTextColor,
      ':is([data-focused])': vars.labelTextColor$focus,
      ':is([data-hovered])': vars.labelTextColor$hover,
      ':is([data-pressed])': vars.labelTextColor$pressed,
    },
  },
  label$selected: {
    color: {
      default: vars.selectedLabelTextColor,
      ':is([data-focused])': vars.selectedLabelTextColor$focus,
      ':is([data-hovered])': vars.selectedLabelTextColor$hover,
      ':is([data-pressed])': vars.selectedLabelTextColor$pressed,
    },
  },
  label$disabled: {
    color: vars.labelTextColor$disabled,
    opacity: vars.labelTextOpacity$disabled,
  },
  icon: {
    // Place content above background elements
    zIndex: 1,
    alignSelf: 'center',
    display: 'flex',
    fill: 'currentColor',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon$selected: {
    color: {
      default: vars.selectedIconColor,
      ':is([data-focused])': vars.selectedIconColor$focus,
      ':is([data-hovered])': vars.selectedIconColor$hover,
      ':is([data-pressed])': vars.selectedIconColor$pressed,
    },
  },
  icon$leading: {
    color: chipStateVars.iconColor,
    marginInlineEnd: vars.iconLabelSpace,
    fontSize: vars.iconSize,
    height: vars.iconSize,
    width: vars.iconSize,
  },
  icon$trailing: {
    position: 'relative',
    fontSize: vars.iconSize,
    height: vars.iconSize,
    width: vars.iconSize,

    color: {
      default: vars.trailingIconColor,
      ':is([data-focused])': vars.trailingIconColor$focus,
      ':is([data-hovered])': vars.trailingIconColor$hover,
      ':is([data-pressed])': vars.trailingIconColor$pressed,
    },
  },
  icon$trailing$selected: {
    color: {
      default: vars.selectedTrailingIconColor,
      ':is([data-focused])': vars.selectedTrailingIconColor$focus,
      ':is([data-hovered])': vars.selectedTrailingIconColor$hover,
      ':is([data-pressed])': vars.selectedTrailingIconColor$pressed,
    },
  },
  icon$disabled: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [chipStateVars.iconColor]: vars.iconColor$disabled,
    opacity: vars.iconOpacity$disabled,
  },
  icon$avatar: {
    height: vars.avatarSize,
    width: vars.avatarSize,
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
export const rippleStyles: MapNamespaces<IRippleStyles> =
  stylex.create<IRippleStyles>({
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
export const focusRingStyles: MapNamespaces<IFocusRingStyles> =
  stylex.create<IFocusRingStyles>({
    host: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [focusRingVars.shape]: chipStateVars.containerShape,
    },
  });

type IElevationStyles = IStyles<IElevationStyleKey>;
export const elevationStyles: MapNamespaces<IElevationStyles> = stylex.create<
  IStyles<IElevationStyleKey>
>({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [elevationVars.boxShadow]: chipStateVars.elevation,
  },
});

export const trailingActionFocusRingStyles: MapNamespaces<IFocusRingStyles> =
  stylex.create<IFocusRingStyles>({
    host: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [focusRingVars.shape]: '50%',
      height: `calc(4 / 3 * ${vars.iconSize})`,
      width: `calc(4 / 3 * ${vars.iconSize})`,
    },
    host$outward: {
      inset: 'unset',
    },
    host$inward: {
      inset: 'unset',
    },
  });

export const trailingActionRippleStyles: MapNamespaces<IRippleStyles> =
  stylex.create<IRippleStyles>({
    host: {
      borderRadius: '50%',
      height: `calc(4 / 3 * ${vars.iconSize})`,
      width: `calc(4 / 3 * ${vars.iconSize})`,
      inset: 'unset',
    },
  });

type ICircularProgressIndicatorStyles =
  IStyles<ICircularProgressIndicatorStyleKey>;
export const circularProgressIndicatorStyles: MapNamespaces<ICircularProgressIndicatorStyles> =
  stylex.create<ICircularProgressIndicatorStyles>({
    host: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [circularProgressIndicatorVars.color]: chipStateVars.iconColor,
    },
  });
