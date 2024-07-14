import stylex from '@stylexjs/stylex';

import { checkboxTokens as vars } from './Checkbox.stylex';
import { componentVars as statelayerVars } from '@/themes/base/StateLayer/StateLayer.stylex';
import { componentVars as focusRingVars } from '@/themes/base/FocusRing/FocusRing.stylex';
import { motionVars } from '@/themes/base/vars/motion.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { checkboxStateTokens } from './Checkbox.state.stylex';

// The stroke width of the icon marks.
const markStroke = '2px';
// The coordinates in an 18px viewBox of the bottom left corner of the
// indeterminate icon. Y is negative to fix an issue in Safari (see below).
const indeterminateBottomLeft = '4px, -10px';
// The coordinates in an 18px viewBox of the bottom left corner of the
// checkmark icon. Y is negative to fix an issue in Safari (see below).
const checkMarkBottomLeft = '7px, -14px';

const prevUnselectedToCheckedKeyframes = stylex.keyframes({
  from: {
    width: 0,
  },
});

export type ICheckboxStylesKey = keyof typeof checkboxStyles;
export const checkboxStyles = stylex.create({
  host: {
    borderRadius: vars.containerShape,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: vars.containerSize,
    height: vars.containerSize,
    position: 'relative',
    verticalAlign: 'top', // Fix extra space when placed inside display: block
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer',

    [checkboxStateTokens.stateLayerColor$hover]: vars.stateLayerColor$hover,
    [checkboxStateTokens.stateLayerOpacity$hover]: vars.stateLayerOpacity$hover,
    [checkboxStateTokens.stateLayerColor$pressed]: vars.stateLayerColor$pressed,
    [checkboxStateTokens.stateLayerOpacity$pressed]:
      vars.stateLayerOpacity$pressed,
  },
  host$selected: {
    [checkboxStateTokens.stateLayerColor$hover]:
      vars.selectedStateLayerColor$hover,
    [checkboxStateTokens.stateLayerOpacity$hover]:
      vars.selectedStateLayerOpacity$hover,
    [checkboxStateTokens.stateLayerColor$pressed]:
      vars.selectedStateLayerColor$pressed,
    [checkboxStateTokens.stateLayerOpacity$pressed]:
      vars.selectedStateLayerOpacity$pressed,
  },
  host$disabled: {
    cursor: 'default',
    pointerEvents: 'none',
  },
  container: {
    borderRadius: 'inherit',
    display: 'flex',
    height: '100%',
    placeContent: 'center',
    placeItems: 'center',
    position: 'relative',
    width: '100%',
  },
  input: {
    appearance: 'none',
    width: 48,
    height: 48,
    margin: 0,
    opacity: 0,
    outline: 'none',
    position: 'absolute',
    zIndex: '1',
    cursor: 'inherit',
  },
  overlay: {
    inset: 0,
    position: 'absolute',
  },
  outline: {
    borderRadius: 'inherit',
    borderStyle: 'solid',

    borderColor: {
      default: vars.outlineColor,
      ':is([data-focused])': vars.outlineColor$focus,
      ':is([data-hovered])': vars.outlineColor$hover,
      ':is([data-pressed])': vars.outlineColor$pressed,
    },
    borderWidth: {
      default: vars.outlineWidth,
      ':is([data-focused])': vars.outlineWidth$focus,
      ':is([data-hovered])': vars.outlineWidth$hover,
      ':is([data-pressed])': vars.outlineWidth$pressed,
    },
  },
  outline$disabled: {
    borderColor: vars.outlineColor$disabled,
    borderWidth: vars.outlineWidth$disabled,
    opacity: vars.containerOpacity$disabled,
  },
  outline$disabled$selected: {
    // Hide the outline behind the transparent selected container color.
    // This can be removed once disabled colors are flattened.
    visibility: 'hidden',
  },
  background: {
    borderRadius: 'inherit',

    backgroundColor: {
      default: vars.selectedContainerColor,
      ':is([data-focused])': vars.selectedContainerColor$focus,
      ':is([data-hovered])': vars.selectedContainerColor$hover,
      ':is([data-pressed])': vars.selectedContainerColor$pressed,
    },
  },
  background$disabled: {
    // Don't animate to/from disabled states because the outline is hidden when
    // selected. Without this, there'd be a FOUC if the checkbox state is
    // programmatically  changed while disabled.
    animationDuration: '0s',
    transitionDuration: '0s',
  },
  background$disabled$selected: {
    // Set disabled opacity only when selected since opacity is used to show
    // or hide the container background.
    background: vars.selectedContainerColor$disabled,
    opacity: vars.selectedContainerOpacity$disabled,
  },
  background$prevDisabled: {
    // Don't animate to/from disabled states because the outline is hidden when
    // selected. Without this, there'd be a FOUC if the checkbox state is
    // programmatically  changed while disabled.
    animationDuration: '0s',
    transitionDuration: '0s',
  },
  backgroundAndIcon: {
    opacity: 0, // Background and icon fade in
    transitionProperty: 'transform, opacity',
    transitionDuration: `${motionVars.duration$short3}, ${motionVars.duration$short1}`, // Exit duration for scale and opacity
    transitionTimingFunction: `${motionVars.easing$emphasizedAccelerate}, linear`, // Exit easing function for scale, linear for opacity
    transform: 'scale(0.6)',
  },
  backgroundAndIcon$selected: {
    opacity: 1,
    transitionDuration: `${motionVars.duration$medium3}, ${motionVars.duration$short1}`, // Enter duration for scale and opacity.
    transitionTimingFunction: `${motionVars.easing$emphasizedDecelerate}, linear`, // Enter easing function for scale, linear for opacity
    transform: 'scale(1)',
  },
  icon: {
    // The icon is created with two <rect> marks for animation:
    // 1. Short end
    //   - the smaller leading part of the checkmark
    //   - hidden behind long end for indeterminate mark
    // 2. Long end
    //   - the larger trailing part of the checkmark
    //   - the entirety of the indeterminate mark
    width: vars.iconSize,
    height: vars.iconSize,

    fill: {
      default: vars.selectedIconColor,
      ':is([data-focused])': vars.selectedIconColor$focus,
      ':is([data-hovered])': vars.selectedIconColor$hover,
      ':is([data-pressed])': vars.selectedIconColor$pressed,
    },
  },
  icon$disabled: {
    // Don't animate to/from disabled states because the outline is hidden when
    // selected. Without this, there'd be a FOUC if the checkbox state is
    // programmatically  changed while disabled.
    animationDuration: '0s',
    transitionDuration: '0s',

    fill: vars.selectedIconColor$disabled,
  },
  icon$prevDisabled: {
    // Don't animate to/from disabled states because the outline is hidden when
    // selected. Without this, there'd be a FOUC if the checkbox state is
    // programmatically  changed while disabled.
    animationDuration: '0s',
    transitionDuration: '0s',
  },
  mark: {
    // Exit duration and easing.
    animationDuration: motionVars.duration$short3,
    animationTimingFunction: motionVars.easing$emphasizedAccelerate,
    transitionDuration: motionVars.duration$short3,
    transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
  },
  mark$selected: {
    // Enter duration and easing.
    animationDuration: motionVars.duration$medium3,
    animationTimingFunction: motionVars.easing$emphasizedDecelerate,
  },
  mark$disabled: {
    // Don't animate to/from disabled states because the outline is hidden when
    // selected. Without this, there'd be a FOUC if the checkbox state is
    // programmatically  changed while disabled.
    animationDuration: '0s',
    transitionDuration: '0s',
  },
  mark$prevDisabled: {
    // Don't animate to/from disabled states because the outline is hidden when
    // selected. Without this, there'd be a FOUC if the checkbox state is
    // programmatically  changed while disabled.
    animationDuration: '0s',
    transitionDuration: '0s',
  },
  mark$prevUnselected: {
    // When selecting an unselected checkbox, don't transition between the
    // checked and indeterminate states. The checkmark icon or indeterminate icon
    // should fade in from its final position.
    transitionProperty: 'none',
  },
  mark$short: {
    // The short end of the checkmark. Initially hidden underneath the indeterminate mark.
    width: markStroke,
    height: markStroke,
    transitionProperty: 'transform, height',
  },
  mark$long: {
    // The long end of the checkmark. Initially the indeterminate mark.
    width: 10,
    height: markStroke,
    transitionProperty: 'transform, width',
  },
  mark$long$prevUnselected$checked: {
    animationName: prevUnselectedToCheckedKeyframes,
  },
  checkMark: {
    // Transform from the bottom left of the rectangles, whch turn into the
    // bottom-most point of the checkmark.
    // Fix Safari's transform-origin bug from "top left" to "bottom left"
    // Move the "bottom left" corner to the checkmark location.
    // Rotate the checkmark.
    transform: `scaleY(-1) translate(${checkMarkBottomLeft}) rotate(45deg)`,
  },
  checkMark$short: {
    // The right triangle that forms the short end has an X, Y length of
    // 4dp, 4dp. The hypoteneuse is √(4*4 + 4*4), which is the length of the
    // short end when checked.
    height: Math.sqrt(32),
  },
  checkMark$long: {
    // The right triangle that forms the long end has an X, Y length of
    // 8dp, 8dp. The hypoteneuse is √(8*8 + 8*8), which is the length of the
    // long end when checked.
    width: Math.sqrt(128),
  },
  indeterminate: {
    transform: `scaleY(-1) translate(${indeterminateBottomLeft}) rotate(0deg)`,
  },
});

export const checkboxStateLayerStyles = stylex.create({
  host: {
    borderRadius: vars.stateLayerShape,
    width: vars.stateLayerSize,
    height: vars.stateLayerSize,
    inset: 'unset',

    [statelayerVars.color$hover]: checkboxStateTokens.stateLayerColor$hover,
    [statelayerVars.opacity$hover]: checkboxStateTokens.stateLayerOpacity$hover,
    [statelayerVars.color$pressed]: checkboxStateTokens.stateLayerColor$pressed,
    [statelayerVars.opacity$pressed]:
      checkboxStateTokens.stateLayerOpacity$pressed,
  },
});

export const checkboxFocusRingStyles = stylex.create({
  host: {
    width: 44,
    height: 44,
    [focusRingVars.shape]: shapeVars.corner$full,
  },
  host$outward: {
    inset: 'unset',
  },
  host$inward: {
    inset: 'unset',
  },
});
