import stylex from '@stylexjs/stylex';

import { fieldBaseTokens } from '../FieldBase.stylex';
import { motionTokens } from '@/themes/base/motion.stylex';
import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { stateTokens } from '@/themes/base/state.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';

// https://github.com/material-components/material-web/blob/main/field/internal/_filled-field.scss

export type IFilledFieldBaseStylesKey = keyof typeof filledFieldBaseStyles;
export const filledFieldBaseStyles = stylex.create({
  host: {
    [fieldBaseTokens.containerColor]: colorSchemeTokens.surfaceContainerHighest,
    [fieldBaseTokens.containerShape]: shapeTokens.cornerTop$xs,
    [fieldBaseTokens.containerColor$disabled]: colorSchemeTokens.onSurface,
    [fieldBaseTokens.containerOpacity$disabled]: '0.04',

    [fieldBaseTokens.stateLayerColor$hover]: colorSchemeTokens.onSurface,
    [fieldBaseTokens.stateLayerOpacity$hover]:
      stateTokens.stateLayerOpacity$hover,
    [fieldBaseTokens.stateLayerColor$error$hover]: colorSchemeTokens.onSurface,
    [fieldBaseTokens.stateLayerOpacity$error$hover]:
      stateTokens.stateLayerOpacity$hover,
  },
  container$resizable: {
    // Move the container up so that the resize handle doesn't overlap the focus
    // indicator. Content is moved back the opposite direction.
    bottom: fieldBaseTokens.activeIndicatorHeight$focus,
    // Ensures the container doesn't create an overhang that can be clicked on.
    clipPath: `inset(${fieldBaseTokens.activeIndicatorHeight$focus} 0 0 0)`,
  },
  section$resizable: {
    top: fieldBaseTokens.activeIndicatorHeight$focus,
  },
  background: {
    borderRadius: 'inherit',
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',

    backgroundColor: fieldBaseTokens.containerColor,
  },
  background$disabled: {
    backgroundColor: fieldBaseTokens.containerColor$disabled,
    opacity: fieldBaseTokens.containerOpacity$disabled,
  },
  stateLayer: {
    borderRadius: 'inherit',
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',

    visibility: {
      default: 'hidden',
      ':is([data-hovered])': 'unset',
    },
    backgroundColor: {
      default: 'unset',
      ':is([data-hovered])': fieldBaseTokens.stateLayerColor$hover,
    },
    opacity: {
      default: 1,
      ':is([data-hovered])': fieldBaseTokens.stateLayerOpacity$hover,
    },
  },
  stateLayer$disabled: {
    visibility: 'hidden',
  },
  stateLayer$error: {
    backgroundColor: {
      default: 'unset',
      ':is([data-hovered])': fieldBaseTokens.stateLayerColor$error$hover,
    },
    opacity: {
      default: 1,
      ':is([data-hovered])': fieldBaseTokens.stateLayerOpacity$error$hover,
    },
  },
  label$floating: {
    position: 'absolute',
    top: fieldBaseTokens.topSpace$withLabel,
  },
  activeIndicator: {
    inset: 'auto 0 0 0',
    // Prevent click events on the indicator element since it has no width and
    // causes bugs when handled by the foundation for updating transform-origin.
    pointerEvents: 'none',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  activeIndicatorBackground: {
    inset: 'auto 0 0 0',
    position: 'absolute',
    width: '100%',
    borderBottomWidth: {
      default: fieldBaseTokens.activeIndicatorHeight,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.activeIndicatorHeight$hover,
    },
    borderBottomStyle: 'solid',
    borderBottomColor: {
      default: fieldBaseTokens.activeIndicatorColor,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.activeIndicatorColor$hover,
    },
  },
  activeIndicatorBackground$disabled: {
    borderBottomWidth: fieldBaseTokens.activeIndicatorHeight$disabled,
    borderBottomColor: fieldBaseTokens.activeIndicatorColor$disabled,
    opacity: fieldBaseTokens.activeIndicatorOpacity$disabled,
  },
  activeIndicatorBackground$error: {
    borderBottomColor: {
      default: fieldBaseTokens.activeIndicatorColor$error,
      ':is(:not([data-focused])[data-hovered])':
        fieldBaseTokens.activeIndicatorColor$error$hover,
    },
  },
  activeIndicatorFocus: {
    inset: 'auto 0 0 0',
    position: 'absolute',
    width: '100%',
    borderBottomWidth: fieldBaseTokens.activeIndicatorHeight$focus,
    borderBottomStyle: 'solid',
    borderBottomColor: fieldBaseTokens.activeIndicatorColor$focus,

    transitionProperty: 'opacity',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasized,

    opacity: {
      default: 0,
      ':is([data-focused])': 1,
    },
  },
  activeIndicatorFocus$error: {
    borderBottomColor: fieldBaseTokens.activeIndicatorColor$error$focus,
  },
  labelWrapper$withoutStart: {
    marginInlineStart: fieldBaseTokens.leadingSpace,
  },
  labelWrapper$withoutEnd: {
    marginInlineEnd: fieldBaseTokens.trailingSpace,
  },
  contentSlot$withoutStart: {
    paddingInlineStart: fieldBaseTokens.leadingSpace,
  },
  contentSlot$withoutEnd: {
    paddingInlineEnd: fieldBaseTokens.trailingSpace,
  },
  contentSlot$withLabel: {
    paddingTop: `calc(${fieldBaseTokens.topSpace$withLabel} + ${fieldBaseTokens.labelTextPopulatedLineHeight})`,
    paddingBottom: fieldBaseTokens.bottomSpace$withLabel,
  },
  contentSlot$withLabel$textArea: {
    paddingTop: 0,
    paddingBottom: 0,

    // Use margin for textareas since they will scroll over the label if not.
    marginTop: `calc(${fieldBaseTokens.topSpace$withLabel} + ${fieldBaseTokens.labelTextPopulatedLineHeight})`,
    marginBottom: fieldBaseTokens.bottomSpace$withLabel,
  },
});
