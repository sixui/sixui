import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IFieldStyleKey } from '@/components/atoms/Field';
import { componentVars as vars } from '../TextField/TextField.stylex';
import { motionVars } from '../vars/motion.stylex';

// Add padding that will grow to compensate for the outline's shape.
// This is needed to prevent the outline border from clipping with the label
// and is mirrored in the container padding to align the content and resting
// label with the adjusted floating label.
const startSpace = `max(${vars.leadingSpace}, ${vars.outlineLabelPadding})`;
const endSpace = `${vars.trailingSpace}`;

// https://github.com/material-components/material-web/blob/main/field/internal/_outlined-field.scss
type IFieldStyles = IStyles<IFieldStyleKey>;
export const styles: MapNamespaces<IFieldStyles> = stylex.create<IFieldStyles>({
  container$resizable: {
    // Move the container up and to the left so that the resize handle doesn't
    // overlap the focus outline. Content is moved back the opposite direction.
    bottom: vars.outlineWidth$focus,
    insetInlineEnd: vars.outlineWidth$focus,
    // Ensures the container doesn't create an overhang that can be clicked on.
    clipPath: `inset(${vars.outlineWidth$focus}) 0 0 ${vars.outlineWidth$focus})`,
  },
  section$resizable: {
    top: vars.outlineWidth$focus,
    insetInlineStart: vars.outlineWidth$focus,
  },
  outline: {
    borderColor: {
      default: vars.outlineColor,
      ':is([data-focused])': vars.outlineColor$focus,
      ':is(:not([data-focused])[data-hovered])': vars.outlineColor$hover,
    },
    color: {
      // Needed for Firefox HCM
      ':is([data-focused])': vars.outlineColor$focus,
      ':is(:not([data-focused])[data-hovered])': vars.outlineColor$hover,
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
    borderColor: vars.outlineColor$disabled,
    color: vars.outlineColor$disabled, // Needed for Firefox HCM
  },
  outline$error: {
    borderColor: {
      default: vars.outlineColor$error,
      ':is([data-focused])': vars.outlineColor$error$focus,
      ':is(:not([data-focused])[data-hovered])': vars.outlineColor$error$hover,
    },
    color: {
      // Needed for Firefox HCM
      ':is([data-focused])': vars.outlineColor$error$focus,
      ':is(:not([data-focused])[data-hovered])': vars.outlineColor$error$hover,
    },
  },
  outlineBorder: {
    borderWidth: 'inherit',
    borderStyle: 'inherit',
    borderColor: 'inherit',
    inset: 0,
    position: 'absolute',
  },
  outlineSection$startEnd: {
    borderWidth: 'inherit',
    borderStyle: 'inherit',
    borderColor: 'inherit',
    borderRadius: 'inherit',
    position: 'relative',
  },
  outlineSection$startEnd$disabled: {
    opacity: vars.outlineOpacity$disabled,
  },
  outlineBorder$startEnd: {
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
  },
  outlineBorder$active$startEnd: {
    opacity: {
      default: 0,
      ':is([data-focused])': 1,
    },
    transitionProperty: 'opacity',
    transitionDuration: motionVars.duration$short3,
    transitionTimingFunction: motionVars.easing$emphasized,
    borderWidth: vars.outlineWidth$focus,
  },
  outlineBorder$start: {
    borderInlineStartStyle: 'solid',
    borderInlineEndStyle: 'none',
    borderStartStartRadius: 'inherit',
    borderStartEndRadius: 0,
    borderEndStartRadius: 'inherit',
    borderEndEndRadius: 0,
    marginInlineEnd: vars.outlineLabelPadding,
  },
  outlineSection$end: {
    flexGrow: 1,
    marginInlineStart: `calc(-1 * ${vars.outlineLabelPadding})`,
  },
  outlineBorder$end: {
    borderInlineStartStyle: 'none',
    borderInlineEndStyle: 'solid',
    borderStartStartRadius: 0,
    borderStartEndRadius: 'inherit',
    borderEndStartRadius: 0,
    borderEndEndRadius: 'inherit',
  },
  outlineNotch: {
    alignItems: 'flex-start',
    borderWidth: 'inherit',
    borderStyle: 'inherit',
    borderColor: 'inherit',
    display: 'flex',
    marginInlineStart: `calc(-1 * ${vars.outlineLabelPadding})`,
    marginInlineEnd: vars.outlineLabelPadding,
    maxWidth: `calc(100% - ${vars.leadingSpace} - ${vars.trailingSpace})`,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: vars.outlineLabelPadding,
    paddingRight: vars.outlineLabelPadding,
    position: 'relative',
  },
  outlineNotch$withoutLabel: {
    display: 'none',
  },
  outlineSection$panel: {
    borderWidth: 'inherit',
    borderStyle: 'inherit',
    borderColor: 'inherit',
    borderBottomStyle: 'solid',
    inset: 0,
    position: 'absolute',
  },
  outlineBorder$panel: {
    borderTopStyle: 'solid',
    borderBottomStyle: 'unset',
    bottom: 'auto',
    transitionProperty: 'transform',
    transitionDuration: motionVars.duration$short3,
    transitionTimingFunction: motionVars.easing$emphasized,

    transform: {
      default: 'scaleX(1)',
      ':is([data-focused])': 'scaleX(0)',
    },
  },
  outlineBorder$inactive$panel: {
    // Note: no need to do any RTL flipping here. If RTLCSS flips this, it's also
    // ok, we just need one to be left and one to be right.
    right: '50%',
    transformOrigin: 'top left',
  },
  outlineBorder$active$panel: {
    // Note: no need to do any RTL flipping here. If RTLCSS flips this, it's also
    // ok, we just need one to be left and one to be right.
    left: '50%',
    transformOrigin: 'top right',
  },
  outlineBorder$panel$populated: {
    transform: 'scaleX(0)',
  },
  outlineSection$panel$active: {
    opacity: {
      default: 0,
      ':is([data-focused])': 1,
    },
    transitionProperty: 'opacity',
    transitionDuration: motionVars.duration$short3,
    transitionTimingFunction: motionVars.easing$emphasized,
    borderWidth: vars.outlineWidth$focus,
  },
  outlineLabel: {
    display: 'flex',
    maxWidth: '100%',
    // Center the floating label within the outline stroke
    transform: `translateY(calc(-100% + ${vars.labelTextPaddingBottom}))`,
  },
  outlineSection$start: {
    paddingInlineStart: startSpace,
  },
  contentSlot$withoutStart: {
    paddingInlineStart: startSpace,
  },
  labelWrapper$withoutStart: {
    marginInlineStart: startSpace,
  },
  contentSlot$withoutEnd: {
    paddingInlineEnd: endSpace,
  },
  labelWrapper$withoutEnd: {
    marginInlineEnd: endSpace,
  },
  outlineBorder$inactive$startEnd: {
    borderWidth: {
      default: vars.outlineWidth,
      ':is([data-hovered])': vars.outlineWidth$hover,
    },
  },
  outlineBorder$inactive$startEnd$disabled: {
    borderWidth: vars.outlineWidth$disabled,
  },
  outlineSection$panel$inactive: {
    borderWidth: {
      default: vars.outlineWidth,
      ':is([data-hovered])': vars.outlineWidth$hover,
    },
  },
  outlineSection$panel$inactive$disabled: {
    borderWidth: vars.outlineWidth$disabled,
    opacity: vars.outlineOpacity$disabled,
  },
  outlineBorder$inactive$panel$inactive: {
    borderWidth: {
      default: vars.outlineWidth,
      ':is([data-hovered])': vars.outlineWidth$hover,
    },
  },
  outlineBorder$inactive$panel$inactive$disabled: {
    borderWidth: vars.outlineWidth$disabled,
  },
  outlineBorder$inactive$panel$active: {
    borderWidth: vars.outlineWidth$focus,
  },
  outlineBorder$active$panel$inactive: {
    borderWidth: {
      default: vars.outlineWidth,
      ':is([data-hovered])': vars.outlineWidth$hover,
    },
  },
  outlineBorder$active$panel$inactive$disabled: {
    borderWidth: vars.outlineWidth$disabled,
  },
  outlineBorder$active$panel$active: {
    borderWidth: vars.outlineWidth$focus,
  },
});
