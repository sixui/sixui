import stylex from '@stylexjs/stylex';

import { fieldBaseTokens } from '../FieldBase.stylex';
import { motionTokens } from '~/themes/base/motion.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';

// https://github.com/material-components/material-web/blob/main/field/internal/_outlined-field.scss

// Add padding that will grow to compensate for the outline's shape.
// This is needed to prevent the outline border from clipping with the label
// and is mirrored in the container padding to align the content and resting
// label with the adjusted floating label.
const startSpace = `max(${fieldBaseTokens.leadingSpace}, ${fieldBaseTokens.outlineLabelPadding})`;
const endSpace = `${fieldBaseTokens.trailingSpace}`;

export type IOutlinedFieldBaseStylesKey = keyof typeof outlinedFieldBaseStyles;
export const outlinedFieldBaseStyles = stylex.create({
  host: {
    [fieldBaseTokens.containerShape]: shapeTokens.corner$xs,
  },
  container$resizable: {
    // Move the container up and to the left so that the resize handle doesn't
    // overlap the focus outline. Content is moved back the opposite direction.
    bottom: fieldBaseTokens.outlineWidth$focus,
    insetInlineEnd: fieldBaseTokens.outlineWidth$focus,
    // Ensures the container doesn't create an overhang that can be clicked on.
    clipPath: `inset(${fieldBaseTokens.outlineWidth$focus} 0 0 ${fieldBaseTokens.outlineWidth$focus})`,
  },
  section$resizable: {
    top: fieldBaseTokens.outlineWidth$focus,
    insetInlineStart: fieldBaseTokens.outlineWidth$focus,
  },
  outline: {
    borderColor: {
      default: fieldBaseTokens.outlineColor,
      ':is([data-focused])': fieldBaseTokens.outlineColor$focus,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.outlineColor$hover,
    },
    color: {
      default: 'inherit',
      // Needed for Firefox HCM
      ':is([data-focused])': fieldBaseTokens.outlineColor$focus,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.outlineColor$hover,
    },
    borderRadius: 'inherit',
    display: 'flex',
    // Allow events to target elements underneath the outline, such as icons.
    pointerEvents: 'none',
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  outline$disabled: {
    borderColor: fieldBaseTokens.outlineColor$disabled,
    color: fieldBaseTokens.outlineColor$disabled, // Needed for Firefox HCM
  },
  outline$error: {
    borderColor: {
      default: fieldBaseTokens.outlineColor$error,
      ':is([data-focused])': fieldBaseTokens.outlineColor$error$focus,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.outlineColor$error$hover,
    },
    color: {
      default: 'inherit',
      // Needed for Firefox HCM
      ':is([data-focused])': fieldBaseTokens.outlineColor$error$focus,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.outlineColor$error$hover,
    },
  },
  // outlineSection: {},
  // outlineSection$startEnd: {
  //   borderWidth: 'inherit',
  //   borderStyle: 'inherit',
  //   borderColor: 'inherit',
  //   borderRadius: 'inherit',
  //   position: 'relative',
  // },
  // outlineSection$start: {
  //   paddingInlineStart: startSpace,
  // },
  // outlineSection$startEnd$disabled: {
  //   opacity: fieldBaseTokens.outlineOpacity$disabled,
  // },
  // outlineSection$end: {
  //   flexGrow: 1,
  //   marginInlineStart: `calc(-1 * ${fieldBaseTokens.outlineLabelPadding})`,
  // },
  // outlineSection$panel: {
  //   borderWidth: 'inherit',
  //   borderColor: 'inherit',
  //   borderTopStyle: 'none',
  //   borderRightStyle: 'none',
  //   borderBottomStyle: 'solid',
  //   borderLeftStyle: 'none',
  //   inset: 0,
  //   position: 'absolute',
  // },
  // outlineSection$panel$active: {
  //   opacity: {
  //     default: 0,
  //     ':is([data-focused])': 1,
  //   },
  //   transitionProperty: 'opacity',
  //   transitionDuration: motionTokens.duration$short3,
  //   transitionTimingFunction: motionTokens.easing$emphasized,
  //   borderWidth: fieldBaseTokens.outlineWidth$focus,
  // },
  // outlineSection$panel$inactive: {
  //   borderWidth: {
  //     default: fieldBaseTokens.outlineWidth,
  //     ':is([data-hovered])': fieldBaseTokens.outlineWidth$hover,
  //   },
  // },
  // outlineSection$panel$inactive$disabled: {
  //   borderWidth: fieldBaseTokens.outlineWidth$disabled,
  //   opacity: fieldBaseTokens.outlineOpacity$disabled,
  // },
  // outlineBorder: {
  //   borderWidth: 'inherit',
  //   borderStyle: 'inherit',
  //   borderColor: 'inherit',
  //   inset: 0,
  //   position: 'absolute',
  // },
  // outlineBorder$startEnd: {
  //   borderTopStyle: 'solid',
  //   borderBottomStyle: 'solid',
  // },
  // outlineBorder$start: {
  //   borderInlineStartStyle: 'solid',
  //   borderInlineEndStyle: 'none',
  //   borderStartStartRadius: 'inherit',
  //   borderStartEndRadius: 0,
  //   borderEndStartRadius: 'inherit',
  //   borderEndEndRadius: 0,
  //   marginInlineEnd: fieldBaseTokens.outlineLabelPadding,
  // },
  // outlineBorder$inactive: {},
  // outlineBorder$inactive$startEnd: {
  //   borderWidth: {
  //     default: fieldBaseTokens.outlineWidth,
  //     ':is([data-hovered])': fieldBaseTokens.outlineWidth$hover,
  //   },
  // },
  // outlineBorder$inactive$end: {},
  // outlineBorder$inactive$start: {},
  // outlineBorder$inactive$startEnd$disabled: {
  //   borderWidth: fieldBaseTokens.outlineWidth$disabled,
  // },
  // outlineBorder$active: {},
  // outlineBorder$active$startEnd: {
  //   opacity: {
  //     default: 0,
  //     ':is([data-focused])': 1,
  //   },
  //   transitionProperty: 'opacity',
  //   transitionDuration: motionTokens.duration$short3,
  //   transitionTimingFunction: motionTokens.easing$emphasized,
  //   borderWidth: fieldBaseTokens.outlineWidth$focus,
  // },
  // outlineBorder$active$end: {},
  // outlineBorder$end: {
  //   borderInlineStartStyle: 'none',
  //   borderInlineEndStyle: 'solid',
  //   borderStartStartRadius: 0,
  //   borderStartEndRadius: 'inherit',
  //   borderEndStartRadius: 0,
  //   borderEndEndRadius: 'inherit',
  // },
  // outlineBorder$panel: {
  //   borderTopStyle: 'solid',
  //   borderBottomStyle: 'unset',
  //   bottom: 'auto',
  //   transitionProperty: 'transform',
  //   transitionDuration: motionTokens.duration$short3,
  //   transitionTimingFunction: motionTokens.easing$emphasized,

  //   transform: {
  //     default: 'scaleX(1)',
  //     ':is([data-focused])': 'scaleX(0)',
  //   },
  // },
  // outlineBorder$inactive$panel: {
  //   // Note: no need to do any RTL flipping here. If RTLCSS flips this, it's also
  //   // ok, we just need one to be left and one to be right.
  //   right: '50%',
  //   transformOrigin: 'top left',
  // },
  // outlineBorder$active$panel: {
  //   // Note: no need to do any RTL flipping here. If RTLCSS flips this, it's also
  //   // ok, we just need one to be left and one to be right.
  //   left: '50%',
  //   transformOrigin: 'top right',
  // },
  // outlineBorder$panel$populated: {
  //   transform: 'scaleX(0)',
  // },
  // outlineBorder$inactive$panel$inactive: {
  //   borderWidth: {
  //     default: fieldBaseTokens.outlineWidth,
  //     ':is([data-hovered])': fieldBaseTokens.outlineWidth$hover,
  //   },
  // },
  // outlineBorder$inactive$panel$inactive$disabled: {
  //   borderWidth: fieldBaseTokens.outlineWidth$disabled,
  // },
  // outlineBorder$inactive$panel$active: {
  //   borderWidth: fieldBaseTokens.outlineWidth$focus,
  // },
  // outlineBorder$active$panel$inactive: {
  //   borderWidth: {
  //     default: fieldBaseTokens.outlineWidth,
  //     ':is([data-hovered])': fieldBaseTokens.outlineWidth$hover,
  //   },
  // },
  // outlineBorder$active$panel$inactive$disabled: {
  //   borderWidth: fieldBaseTokens.outlineWidth$disabled,
  // },
  // outlineBorder$active$panel$active: {
  //   borderWidth: fieldBaseTokens.outlineWidth$focus,
  // },
  // outlineLabel: {
  //   display: 'flex',
  //   maxWidth: '100%',
  //   // Center the floating label within the outline stroke
  //   transform: `translateY(calc(-100% + ${fieldBaseTokens.labelTextPaddingBottom}))`,
  // },
  // outlineNotch: {
  //   alignItems: 'flex-start',
  //   borderWidth: 'inherit',
  //   borderStyle: 'inherit',
  //   borderColor: 'inherit',
  //   display: 'flex',
  //   marginInlineStart: `calc(-1 * ${fieldBaseTokens.outlineLabelPadding})`,
  //   marginInlineEnd: fieldBaseTokens.outlineLabelPadding,
  //   maxWidth: `calc(100% - ${fieldBaseTokens.leadingSpace} - ${fieldBaseTokens.trailingSpace})`,
  //   paddingTop: 0,
  //   paddingBottom: 0,
  //   paddingLeft: fieldBaseTokens.outlineLabelPadding,
  //   paddingRight: fieldBaseTokens.outlineLabelPadding,
  //   position: 'relative',
  // },
  // outlineNotch$withoutLabel: {
  //   display: 'none',
  // },
  // contentSlot$withoutStart: {
  //   paddingInlineStart: startSpace,
  // },
  // contentSlot$withoutEnd: {
  //   paddingInlineEnd: endSpace,
  // },
  // labelWrapper$withoutStart: {
  //   marginInlineStart: startSpace,
  // },
  // labelWrapper$withoutEnd: {
  //   marginInlineEnd: endSpace,
  // },
});
