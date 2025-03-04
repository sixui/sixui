import { keyframes } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { em } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './Checkmark.constants';

type IModifier =
  | 'disabled'
  | 'on'
  | 'checked'
  | 'indeterminate'
  | 'was-unchecked'
  | 'was-disabled';

// The coordinates in an 18px viewBox of the bottom left corner of the
// indeterminate icon. Y is negative to fix an issue in Safari (see below).
const indeterminateBottomLeft = '1px, -10px';
// The coordinates in an 18px viewBox of the bottom left corner of the checkmark
// icon. Y is negative to fix an issue in Safari (see below).
const checkmarkBottomLeft = '6px, -16px';

const prevUnselectedToCheckedKeyframes = keyframes({
  from: {
    width: 0,
  },
});

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  color: 'currentColor',
  stroke: '2px',
});

const classNames = createStyles({
  root: {
    width: em(1),
    height: em(1),
  },
  svg: {
    fill: tokens.color,
  },
  mark: ({ root }) => ({
    animationDuration: themeTokens.motion.duration.short3,
    animationTimingFunction: themeTokens.motion.easing.emphasized.accelerate,
    transitionDuration: themeTokens.motion.duration.short3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,
    transform: 'scale(0)',
    vectorEffect: 'non-scaling-stroke',

    selectors: {
      [modifierSelector<IModifier>('on', root)]: {
        // Enter duration and easing.
        animationDuration: themeTokens.motion.duration.medium3,
        animationTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
      },
      [modifierSelector<IModifier>('checked', root)]: {
        // Transform from the bottom left of the rectangles, which turn into the
        // bottom-most point of the checkmark. Fix Safari's transform-origin bug
        // from "top left" to "bottom left" Move the "bottom left" corner to the
        // checkmark location. Rotate the checkmark.
        transform: `scaleY(-1) translate(${checkmarkBottomLeft}) rotate(45deg)`,
      },
      [modifierSelector<IModifier>('indeterminate', root)]: {
        transform: `scaleY(-1) translate(${indeterminateBottomLeft}) rotate(0deg)`,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the
        // checkboxIndicator state is programmatically changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',
      },
      [modifierSelector<IModifier>('was-unchecked', root)]: {
        // When selecting an unselected checkboxIndicator, don't transition
        // between the checked and indeterminate states. The checkmark icon or
        // indeterminate icon should fade in from its final position.
        transitionProperty: 'none',
      },
      [modifierSelector<IModifier>('was-disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the checkbox state
        // is programmatically  changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',
      },
    },
  }),
  mark$short: ({ root }) => ({
    // The short end of the checkmark. Initially hidden underneath the
    // indeterminate mark.
    width: tokens.stroke,
    height: tokens.stroke,
    transitionProperty: 'transform, height',

    selectors: {
      [modifierSelector<IModifier>('checked', root)]: {
        // The right triangle that forms the short end has an X, Y length of
        // 4dp, 4dp. The hypoteneuse is √(4*4 + 4*4), which is the length of the
        // short end when checked.
        height: Math.sqrt(64),
      },
    },
  }),
  mark$long: ({ root }) => ({
    // The long end of the checkmark. Initially the indeterminate mark.
    width: 16,
    height: tokens.stroke,
    transitionProperty: 'transform, width',

    selectors: {
      [modifierSelector<IModifier>('checked', root)]: {
        // The right triangle that forms the long end has an X, Y length of 8dp,
        // 8dp. The hypoteneuse is √(8*8 + 8*8), which is the length of the long
        // end when checked.
        width: Math.sqrt(256),
      },
      [modifierSelector<IModifier>(['was-unchecked', 'on'], root)]: {
        animationName: prevUnselectedToCheckedKeyframes,
      },
    },
  }),
});

export type ICheckmarkThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const checkmarkTheme = componentThemeFactory<ICheckmarkThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
