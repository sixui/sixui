import { createTheme, keyframes } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { cssLayers, themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

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

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  color: 'currentColor',
  stroke: '2px',
});

const classNames = createStyles({
  root: {
    width: '1em',
    height: '1em',
  },
  svg: {
    fill: tokens.color,
  },
  mark: ({ root }) => ({
    animationDuration: themeTokens.motion.duration.short.$3,
    animationTimingFunction: themeTokens.motion.easing.emphasized.accelerate,
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,
    transform: 'scale(0)',
    vectorEffect: 'non-scaling-stroke',

    selectors: {
      [getModifierSelector<IModifier>('on', root)]: {
        // Enter duration and easing.
        animationDuration: themeTokens.motion.duration.medium.$3,
        animationTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
      },
      [getModifierSelector<IModifier>('checked', root)]: {
        // Transform from the bottom left of the rectangles, which turn into the
        // bottom-most point of the checkmark. Fix Safari's transform-origin bug
        // from "top left" to "bottom left" Move the "bottom left" corner to the
        // checkmark location. Rotate the checkmark.
        transform: `scaleY(-1) translate(${checkmarkBottomLeft}) rotate(45deg)`,
      },
      [getModifierSelector<IModifier>('indeterminate', root)]: {
        transform: `scaleY(-1) translate(${indeterminateBottomLeft}) rotate(0deg)`,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the
        // checkboxIndicator state is programmatically changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',
      },
      [getModifierSelector<IModifier>('was-unchecked', root)]: {
        // When selecting an unselected checkboxIndicator, don't transition
        // between the checked and indeterminate states. The checkmark icon or
        // indeterminate icon should fade in from its final position.
        transitionProperty: 'none',
      },
      [getModifierSelector<IModifier>('was-disabled', root)]: {
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
      [getModifierSelector<IModifier>('checked', root)]: {
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
      [getModifierSelector<IModifier>('checked', root)]: {
        // The right triangle that forms the long end has an X, Y length of 8dp,
        // 8dp. The hypoteneuse is √(8*8 + 8*8), which is the length of the long
        // end when checked.
        width: Math.sqrt(256),
      },
      [getModifierSelector<IModifier>(['was-unchecked', 'on'], root)]: {
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
