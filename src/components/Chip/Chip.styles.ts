import stylex from '@stylexjs/stylex';

import { elevationTokens } from '~/components/Elevation/Elevation.stylex';
import { focusRingTokens } from '~/components/FocusRing/FocusRing.stylex';
import { stateLayerTokens } from '~/components/StateLayer/StateLayer.stylex';
import { circularProgressIndicatorTokens } from '~/components/CircularProgressIndicator/CircularProgressIndicator.stylex';
import { motionTokens } from '~/themes/base/motion.stylex';
import { chipTokens } from './Chip.stylex';
import { chipStateTokens } from './Chip.state.stylex';

// https://github.com/material-components/material-web/blob/main/chips/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/chips/internal/_elevated.scss

export type IChipStylesKey = keyof typeof chipStyles;
export const chipStyles = stylex.create({
  host: {
    borderRadius: chipStateTokens.containerShape,
    display: 'inline-flex',
    height: chipTokens.containerHeight,
    cursor: 'default',
    [chipStateTokens.containerShape]: chipTokens.containerShape,
    [chipStateTokens.iconColor]: chipTokens.iconColor,
  },
  host$interactive: {
    cursor: 'pointer',

    [chipStateTokens.iconColor]: {
      default: chipTokens.iconColor$interactive,
      ':is([data-focused])': chipTokens.iconColor$focus,
      ':is([data-hovered])': chipTokens.iconColor$hover,
      ':is([data-pressed])': chipTokens.iconColor$pressed,
    },
  },
  host$avatar: {
    [chipStateTokens.containerShape]: `calc(${chipTokens.containerHeight} / 2)`,
  },
  host$disabled: {
    cursor: 'default',
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
      backgroundColor: chipTokens.flatContainerColor,
    },
    [chipStateTokens.elevation]: chipTokens.flatContainerElevation,
  },
  flatContainer$interactive: {
    [chipStateTokens.elevation]: {
      default: chipTokens.flatContainerElevation,
      ':is([data-focused])': chipTokens.flatContainerElevation$focus,
      ':is([data-hovered])': chipTokens.flatContainerElevation$hover,
      ':is([data-pressed])': chipTokens.flatContainerElevation$pressed,
    },
  },
  flatContainer$disabled: {
    '::before': {
      backgroundColor: chipTokens.flatContainerColor$disabled,
      opacity: chipTokens.flatContainerOpacity$disabled,
    },
    pointerEvents: 'none',
    [chipStateTokens.elevation]: chipTokens.flatContainerElevation$disabled,
  },
  flatContainer$loading: {
    [chipStateTokens.elevation]: chipTokens.flatContainerElevation,
  },
  selectedFlatContainer: {
    '::before': {
      backgroundColor: chipTokens.selectedFlatContainerColor,
    },
    [chipStateTokens.elevation]: chipTokens.flatContainerElevation,
  },
  selectedFlatContainer$interactive: {
    [chipStateTokens.elevation]: {
      default: chipTokens.flatContainerElevation,
      ':is([data-focused])': chipTokens.selectedFlatContainerElevation$focus,
      ':is([data-hovered])': chipTokens.selectedFlatContainerElevation$hover,
      ':is([data-pressed])': chipTokens.selectedFlatContainerElevation$pressed,
    },
  },
  selectedFlatContainer$disabled: {
    '::before': {
      backgroundColor: chipTokens.selectedFlatContainerColor$disabled,
      opacity: chipTokens.selectedFlatContainerOpacity$disabled,
    },
    pointerEvents: 'none',
    [chipStateTokens.elevation]:
      chipTokens.selectedFlatContainerElevation$disabled,
  },
  selectedFlatContainer$loading: {
    [chipStateTokens.elevation]: chipTokens.flatContainerElevation,
  },
  elevatedContainer: {
    '::before': {
      backgroundColor: chipTokens.elevatedContainerColor,
    },
    [chipStateTokens.elevation]: chipTokens.elevatedContainerElevation,
  },
  elevatedContainer$interactive: {
    [chipStateTokens.elevation]: {
      default: chipTokens.elevatedContainerElevation,
      ':is([data-focused])': chipTokens.elevatedContainerElevation$focus,
      ':is([data-hovered])': chipTokens.elevatedContainerElevation$hover,
      ':is([data-pressed])': chipTokens.elevatedContainerElevation$pressed,
    },
  },
  elevatedContainer$disabled: {
    '::before': {
      backgroundColor: chipTokens.elevatedContainerColor$disabled,
      opacity: chipTokens.elevatedContainerOpacity$disabled,
    },
    pointerEvents: 'none',
    [chipStateTokens.elevation]: chipTokens.elevatedContainerElevation$disabled,
  },
  elevatedContainer$loading: {
    [chipStateTokens.elevation]: chipTokens.elevatedContainerElevation$pressed,
  },
  selectedElevatedContainer: {
    '::before': {
      backgroundColor: chipTokens.selectedElevatedContainerColor,
    },
    [chipStateTokens.elevation]: chipTokens.elevatedContainerElevation,
  },
  selectedElevatedContainer$interactive: {
    [chipStateTokens.elevation]: {
      default: chipTokens.elevatedContainerElevation,
      ':is([data-focused])': chipTokens.elevatedContainerElevation$focus,
      ':is([data-hovered])': chipTokens.elevatedContainerElevation$hover,
      ':is([data-pressed])': chipTokens.elevatedContainerElevation$pressed,
    },
  },
  selectedElevatedContainer$disabled: {
    '::before': {
      backgroundColor: chipTokens.selectedFlatContainerColor$disabled,
      opacity: chipTokens.selectedFlatContainerOpacity$disabled,
    },
    pointerEvents: 'none',
    [chipStateTokens.elevation]: chipTokens.elevatedContainerElevation$disabled,
  },
  selectedElevatedContainer$loading: {
    [chipStateTokens.elevation]: chipTokens.elevatedContainerElevation,
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    appearance: 'none',
    backgroundColor: 'unset',
    borderStyle: 'unset',
    borderRadius: 'inherit',
    outline: 'none',
    padding: 0,
    position: 'relative',
    textDecoration: 'none',
    cursor: 'inherit',
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  action$trailing: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingInlineStart: chipTokens.iconLabelSpace,
    paddingInlineEnd: chipTokens.trailingIconTrailingSpace,
    cursor: 'pointer',
    flexGrow: 0,
    flexShrink: 0,
  },
  action$primary: {
    paddingInlineStart: chipTokens.leadingSpace,
    paddingInlineEnd: chipTokens.trailingSpace,
  },
  action$primary$hasLeading: {
    paddingInlineStart: chipTokens.iconLeadingSpace,
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
    borderWidth: chipTokens.outlineWidth,
    borderStyle: 'solid',
    borderRadius: 'inherit',
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',

    borderColor: chipTokens.outlineColor,
  },
  outline$interactive: {
    borderColor: {
      default: chipTokens.outlineColor,
      ':is([data-focused])': chipTokens.outlineColor$focus,
      ':is([data-pressed])': chipTokens.outlineColor$pressed,
    },
  },
  outline$selected: {
    borderWidth: chipTokens.selectedOutlineWidth,
  },
  outline$disabled: {
    borderColor: chipTokens.outlineColor$disabled,
    opacity: chipTokens.outlineOpacity$disabled,
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
  },
  labelContainer$hasTrailing: {
    position: 'relative',
  },
  label: {
    // Place content above background elements
    zIndex: 1,
    fontFamily: chipTokens.labelTextFont,
    fontSize: chipTokens.labelTextSize,
    lineHeight: chipTokens.labelTextLineHeight,
    letterSpacing: chipTokens.labelTextLetterSpacing,
    fontWeight: chipTokens.labelTextWeight,
    height: '100%',
    userSelect: 'none',
    color: chipTokens.labelTextColor,

    // Long labels are cut off with ellipsis by default. `text-overflow` and
    // `text-wrap` can customize this.
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textWrap: 'nowrap',
  },
  label$interactive: {
    color: {
      default: chipTokens.labelTextColor,
      ':is([data-focused])': chipTokens.labelTextColor$focus,
      ':is([data-hovered])': chipTokens.labelTextColor$hover,
      ':is([data-pressed])': chipTokens.labelTextColor$pressed,
    },
  },
  label$selected: {
    color: chipTokens.selectedLabelTextColor,
  },
  label$selected$interactive: {
    color: {
      default: chipTokens.selectedLabelTextColor,
      ':is([data-focused])': chipTokens.selectedLabelTextColor$focus,
      ':is([data-hovered])': chipTokens.selectedLabelTextColor$hover,
      ':is([data-pressed])': chipTokens.selectedLabelTextColor$pressed,
    },
  },
  label$disabled: {
    color: chipTokens.labelTextColor$disabled,
    opacity: chipTokens.labelTextOpacity$disabled,
  },
  iconContainer: {
    // Place content above background elements
    zIndex: 1,
    alignSelf: 'center',
    display: 'flex',
    fill: 'currentColor',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer$selected: {
    color: chipTokens.selectedIconColor,
  },
  iconContainer$selected$interactive: {
    color: {
      default: chipTokens.selectedIconColor,
      ':is([data-focused])': chipTokens.selectedIconColor$focus,
      ':is([data-hovered])': chipTokens.selectedIconColor$hover,
      ':is([data-pressed])': chipTokens.selectedIconColor$pressed,
    },
  },
  iconContainer$leading: {
    position: 'relative',
    color: chipStateTokens.iconColor,
    marginInlineEnd: chipTokens.iconLabelSpace,
    fontSize: chipTokens.iconSize,
    height: chipTokens.iconSize,
    width: chipTokens.iconSize,

    transitionProperty: 'opacity, width',
    transitionDuration: motionTokens.duration$medium4,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
    opacity: 1,
  },
  iconContainer$collapsed: {
    marginInlineEnd: 0,
    width: 0,
    opacity: 0,

    transitionProperty: 'opacity, width',
    transitionDuration: motionTokens.duration$short2,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
  icon: {
    position: 'absolute',
  },
  icon$avatar: {
    width: '100%',
    height: '100%',
  },
  iconContainer$trailing: {
    position: 'relative',
    fontSize: chipTokens.iconSize,
    height: chipTokens.iconSize,
    width: chipTokens.iconSize,
    color: chipTokens.trailingIconColor,
  },
  iconContainer$trailing$interactive: {
    color: {
      default: chipTokens.trailingIconColor,
      ':is([data-focused])': chipTokens.trailingIconColor$focus,
      ':is([data-hovered])': chipTokens.trailingIconColor$hover,
      ':is([data-pressed])': chipTokens.trailingIconColor$pressed,
    },
  },
  iconContainer$trailing$selected: {
    color: chipTokens.selectedTrailingIconColor,
  },
  iconContainer$trailing$selected$interactive: {
    color: {
      default: chipTokens.selectedTrailingIconColor,
      ':is([data-focused])': chipTokens.selectedTrailingIconColor$focus,
      ':is([data-hovered])': chipTokens.selectedTrailingIconColor$hover,
      ':is([data-pressed])': chipTokens.selectedTrailingIconColor$pressed,
    },
  },
  iconContainer$disabled: {
    [chipStateTokens.iconColor]: chipTokens.iconColor$disabled,
    opacity: chipTokens.iconOpacity$disabled,
  },
  iconContainer$avatar: {
    flexShrink: 0,
    flexGrow: 0,
    height: chipTokens.avatarSize,
    width: chipTokens.avatarSize,
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

export const chipSstateLayerStyles = stylex.create({
  host: {
    [stateLayerTokens.color$hover]: chipTokens.stateLayerColor$hover,
    [stateLayerTokens.opacity$hover]: chipTokens.stateLayerOpacity$hover,
    [stateLayerTokens.color$pressed]: chipTokens.stateLayerColor$pressed,
    [stateLayerTokens.opacity$pressed]: chipTokens.stateLayerOpacity$pressed,
  },
});

export const chipFocusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]: chipStateTokens.containerShape,
  },
});

export const chipElevationStyles = stylex.create({
  host: {
    [elevationTokens.boxShadow]: chipStateTokens.elevation,
  },
});

export const chipTrailingActionFocusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]: '50%',
    height: `calc(4 / 3 * ${chipTokens.iconSize})`,
    width: `calc(4 / 3 * ${chipTokens.iconSize})`,
  },
  host$outward: {
    inset: 'unset',
  },
  host$inward: {
    inset: 'unset',
  },
});

export const chipTrailingActionStateLayerStyles = stylex.create({
  host: {
    borderRadius: '50%',
    height: `calc(4 / 3 * ${chipTokens.iconSize})`,
    width: `calc(4 / 3 * ${chipTokens.iconSize})`,
    inset: 'unset',

    [stateLayerTokens.color$hover]: chipTokens.stateLayerColor$hover,
    [stateLayerTokens.opacity$hover]: chipTokens.stateLayerOpacity$hover,
    [stateLayerTokens.color$pressed]: chipTokens.stateLayerColor$pressed,
    [stateLayerTokens.opacity$pressed]: chipTokens.stateLayerOpacity$pressed,
  },
});

export const chipCircularProgressIndicatorStyles = stylex.create({
  host: {
    [circularProgressIndicatorTokens.color]: chipStateTokens.iconColor,
  },
});
