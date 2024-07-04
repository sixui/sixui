import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IFieldBaseStyleKey } from '@/components/atoms/FieldBase';
import { componentVars as vars } from './FieldBase.stylex';
import { motionVars } from '../vars/motion.stylex';

// https://github.com/material-components/material-web/blob/main/field/internal/_filled-field.scss

type IFieldBaseStyles = IStyles<IFieldBaseStyleKey>;
export const styles: MapNamespaces<IFieldBaseStyles> =
  stylex.create<IFieldBaseStyles>({
    container$resizable: {
      // Move the container up so that the resize handle doesn't overlap the focus
      // indicator. Content is moved back the opposite direction.
      bottom: vars.activeIndicatorHeight$focus,
      // Ensures the container doesn't create an overhang that can be clicked on.
      clipPath: `inset(${vars.activeIndicatorHeight$focus} 0 0 0)`,
    },
    section$resizable: {
      top: vars.activeIndicatorHeight$focus,
    },
    background: {
      borderRadius: 'inherit',
      inset: 0,
      pointerEvents: 'none',
      position: 'absolute',

      backgroundColor: vars.containerColor,
    },
    background$disabled: {
      backgroundColor: vars.containerColor$disabled,
      opacity: vars.containerOpacity$disabled,
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
        ':is([data-hovered])': vars.stateLayerColor$hover,
      },
      opacity: {
        ':is([data-hovered])': vars.stateLayerOpacity$hover,
      },
    },
    stateLayer$disabled: {
      visibility: 'hidden',
    },
    stateLayer$error: {
      backgroundColor: {
        ':is([data-hovered])': vars.stateLayerColor$error$hover,
      },
      opacity: {
        ':is([data-hovered])': vars.stateLayerOpacity$error$hover,
      },
    },
    label$floating: {
      position: 'absolute',
      top: vars.topSpace$withLabel,
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
        default: vars.activeIndicatorHeight,
        ':is(:not([data-focused])[data-hovered])':
          vars.activeIndicatorHeight$hover,
      },
      borderBottomStyle: 'solid',
      borderBottomColor: {
        default: vars.activeIndicatorColor,
        ':is(:not([data-focused])[data-hovered])':
          vars.activeIndicatorColor$hover,
      },
    },
    activeIndicatorBackground$disabled: {
      borderBottomWidth: vars.activeIndicatorHeight$disabled,
      borderBottomColor: vars.activeIndicatorColor$disabled,
      opacity: vars.activeIndicatorOpacity$disabled,
    },
    activeIndicatorBackground$error: {
      borderBottomColor: {
        default: vars.activeIndicatorColor$error,
        ':is(:not([data-focused])[data-hovered])':
          vars.activeIndicatorColor$error$hover,
      },
    },
    activeIndicatorFocus: {
      inset: 'auto 0 0 0',
      position: 'absolute',
      width: '100%',
      borderBottomWidth: vars.activeIndicatorHeight$focus,
      borderBottomStyle: 'solid',
      borderBottomColor: vars.activeIndicatorColor$focus,

      transitionProperty: 'opacity',
      transitionDuration: motionVars.duration$short3,
      transitionTimingFunction: motionVars.easing$emphasized,

      opacity: {
        default: 0,
        ':is([data-focused])': 1,
      },
    },
    activeIndicatorFocus$error: {
      borderBottomColor: vars.activeIndicatorColor$error$focus,
    },
    labelWrapper$withoutStart: {
      marginInlineStart: vars.leadingSpace,
    },
    labelWrapper$withoutEnd: {
      marginInlineEnd: vars.trailingSpace,
    },
    contentSlot$withoutStart: {
      paddingInlineStart: vars.leadingSpace,
    },
    contentSlot$withoutEnd: {
      paddingInlineEnd: vars.trailingSpace,
    },
    contentSlot$withLabel: {
      paddingTop: `calc(${vars.topSpace$withLabel} + ${vars.labelTextPopulatedLineHeight})`,
      paddingBottom: vars.bottomSpace$withLabel,
    },
    contentSlot$withLabel$textArea: {
      paddingTop: 0,
      paddingBottom: 0,

      // Use margin for textareas since they will scroll over the label if not.
      marginTop: `calc(${vars.topSpace$withLabel} + ${vars.labelTextPopulatedLineHeight})`,
      marginBottom: vars.bottomSpace$withLabel,
    },
  });
