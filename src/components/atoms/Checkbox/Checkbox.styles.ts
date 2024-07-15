import stylex from '@stylexjs/stylex';

import { checkboxTokens } from './Checkbox.stylex';
import { stateLayerTokens } from '@/components/utils/StateLayer/StateLayer.stylex';
import { focusRingTokens } from '@/components/utils/FocusRing/FocusRing.stylex';
import { motionTokens } from '@/themes/base/tokens/motion.stylex';
import { shapeTokens } from '@/themes/base/tokens/shape.stylex';
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
    borderRadius: checkboxTokens.containerShape,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: checkboxTokens.containerSize,
    height: checkboxTokens.containerSize,
    position: 'relative',
    verticalAlign: 'top', // Fix extra space when placed inside display: block
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer',

    [checkboxStateTokens.stateLayerColor$hover]:
      checkboxTokens.stateLayerColor$hover,
    [checkboxStateTokens.stateLayerOpacity$hover]:
      checkboxTokens.stateLayerOpacity$hover,
    [checkboxStateTokens.stateLayerColor$pressed]:
      checkboxTokens.stateLayerColor$pressed,
    [checkboxStateTokens.stateLayerOpacity$pressed]:
      checkboxTokens.stateLayerOpacity$pressed,
  },
  host$selected: {
    [checkboxStateTokens.stateLayerColor$hover]:
      checkboxTokens.selectedStateLayerColor$hover,
    [checkboxStateTokens.stateLayerOpacity$hover]:
      checkboxTokens.selectedStateLayerOpacity$hover,
    [checkboxStateTokens.stateLayerColor$pressed]:
      checkboxTokens.selectedStateLayerColor$pressed,
    [checkboxStateTokens.stateLayerOpacity$pressed]:
      checkboxTokens.selectedStateLayerOpacity$pressed,
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
      default: checkboxTokens.outlineColor,
      ':is([data-focused])': checkboxTokens.outlineColor$focus,
      ':is([data-hovered])': checkboxTokens.outlineColor$hover,
      ':is([data-pressed])': checkboxTokens.outlineColor$pressed,
    },
    borderWidth: {
      default: checkboxTokens.outlineWidth,
      ':is([data-focused])': checkboxTokens.outlineWidth$focus,
      ':is([data-hovered])': checkboxTokens.outlineWidth$hover,
      ':is([data-pressed])': checkboxTokens.outlineWidth$pressed,
    },
  },
  outline$disabled: {
    borderColor: checkboxTokens.outlineColor$disabled,
    borderWidth: checkboxTokens.outlineWidth$disabled,
    opacity: checkboxTokens.containerOpacity$disabled,
  },
  outline$disabled$selected: {
    // Hide the outline behind the transparent selected container color.
    // This can be removed once disabled colors are flattened.
    visibility: 'hidden',
  },
  background: {
    borderRadius: 'inherit',

    backgroundColor: {
      default: checkboxTokens.selectedContainerColor,
      ':is([data-focused])': checkboxTokens.selectedContainerColor$focus,
      ':is([data-hovered])': checkboxTokens.selectedContainerColor$hover,
      ':is([data-pressed])': checkboxTokens.selectedContainerColor$pressed,
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
    background: checkboxTokens.selectedContainerColor$disabled,
    opacity: checkboxTokens.selectedContainerOpacity$disabled,
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
    transitionDuration: `${motionTokens.duration$short3}, ${motionTokens.duration$short1}`, // Exit duration for scale and opacity
    transitionTimingFunction: `${motionTokens.easing$emphasizedAccelerate}, linear`, // Exit easing function for scale, linear for opacity
    transform: 'scale(0.6)',
  },
  backgroundAndIcon$selected: {
    opacity: 1,
    transitionDuration: `${motionTokens.duration$medium3}, ${motionTokens.duration$short1}`, // Enter duration for scale and opacity.
    transitionTimingFunction: `${motionTokens.easing$emphasizedDecelerate}, linear`, // Enter easing function for scale, linear for opacity
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
    width: checkboxTokens.iconSize,
    height: checkboxTokens.iconSize,

    fill: {
      default: checkboxTokens.selectedIconColor,
      ':is([data-focused])': checkboxTokens.selectedIconColor$focus,
      ':is([data-hovered])': checkboxTokens.selectedIconColor$hover,
      ':is([data-pressed])': checkboxTokens.selectedIconColor$pressed,
    },
  },
  icon$disabled: {
    // Don't animate to/from disabled states because the outline is hidden when
    // selected. Without this, there'd be a FOUC if the checkbox state is
    // programmatically  changed while disabled.
    animationDuration: '0s',
    transitionDuration: '0s',

    fill: checkboxTokens.selectedIconColor$disabled,
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
    animationDuration: motionTokens.duration$short3,
    animationTimingFunction: motionTokens.easing$emphasizedAccelerate,
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
  mark$selected: {
    // Enter duration and easing.
    animationDuration: motionTokens.duration$medium3,
    animationTimingFunction: motionTokens.easing$emphasizedDecelerate,
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
    borderRadius: checkboxTokens.stateLayerShape,
    width: checkboxTokens.stateLayerSize,
    height: checkboxTokens.stateLayerSize,
    inset: 'unset',

    [stateLayerTokens.color$hover]: checkboxStateTokens.stateLayerColor$hover,
    [stateLayerTokens.opacity$hover]:
      checkboxStateTokens.stateLayerOpacity$hover,
    [stateLayerTokens.color$pressed]:
      checkboxStateTokens.stateLayerColor$pressed,
    [stateLayerTokens.opacity$pressed]:
      checkboxStateTokens.stateLayerOpacity$pressed,
  },
});

export const checkboxFocusRingStyles = stylex.create({
  host: {
    width: 44,
    height: 44,
    [focusRingTokens.shape]: shapeTokens.corner$full,
  },
  host$outward: {
    inset: 'unset',
  },
  host$inward: {
    inset: 'unset',
  },
});
