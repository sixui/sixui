import { createTheme, fallbackVar, keyframes } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { StateLayer } from '../StateLayer';
import { themeTokens } from '../ThemeProvider';

// The coordinates in an 18px viewBox of the bottom left corner of the
// indeterminate icon. Y is negative to fix an issue in Safari (see below).
const indeterminateBottomLeft = '4px, -10px';
// The coordinates in an 18px viewBox of the bottom left corner of the
// checkmark icon. Y is negative to fix an issue in Safari (see below).
const checkMarkBottomLeft = '7px, -14px';

const prevUnselectedToCheckedKeyframes = keyframes({
  from: {
    width: 0,
  },
});

type IModifier =
  | IInteraction
  | 'disabled'
  | 'was-disabled'
  | 'checked'
  | 'was-unchecked'
  | 'indeterminate'
  | 'loading';

const DENSITY = px(getDensity({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createTheme({
  size: px(18),
  iconSize: px(18),
  mark: {
    stroke: px(2),
  },
  background: {
    color: {
      normal: 'transparent',
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: 'inherit',
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  background$checked: {
    color: {
      normal: themeTokens.colorScheme.primary,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  background$error: {
    color: {
      normal: themeTokens.colorScheme.error,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  icon$checked: {
    color: {
      normal: themeTokens.colorScheme.onPrimary,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: themeTokens.colorScheme.surface,
    },
    opacity: {
      disabled: '1',
    },
  },
  // FIXME: error
  icon$error: {
    color: {
      normal: themeTokens.colorScheme.onError,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      disabled: themeTokens.colorScheme.surface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
});

const classNames = createStyles({
  root: {
    width: calc.add(tokens.size, DENSITY),
    height: calc.add(tokens.size, DENSITY),
    display: 'flex',
    placeContent: 'center',
    placeItems: 'center',
    color: themeTokens.colorScheme.onSurfaceVariant,

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        shape: px(2),
        color: {
          disabled: 'transparent',
        },
      },
      outline: {
        color: {
          normal: themeTokens.colorScheme.onSurfaceVariant,
        },
        width: {
          normal: px(themeTokens.outline.width.sm),
        },
        opacity: {
          disabled: themeTokens.state.opacity.disabled,
        },
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>({ loading: true })]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          outline: {
            width: {
              normal: px(themeTokens.outline.width.none),
            },
          },
        }),
      },
      [getModifierSelector<IModifier>({ hovered: true })]: {
        zIndex: 1,
      },
    },
  },
  stateLayer: {
    width: px(themeTokens.density.minTargetSize),
    height: px(themeTokens.density.minTargetSize),
    borderRadius: px(themeTokens.shape.corner.circle),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    vars: createTokensVars(StateLayer.theme.tokens, {
      color: {
        pressed: themeTokens.colorScheme.primary,
      },
    }),
  },
  focusRing: {
    width: px(themeTokens.density.minTargetSize),
    height: px(themeTokens.density.minTargetSize),
    borderRadius: px(themeTokens.shape.corner.circle),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  input: ({ root }) => ({
    // Input is also touch target
    appearance: 'none',
    width: px(
      calc.add(
        themeTokens.density.minTargetSize,
        calc.multiply(2, themeTokens.outline.width.sm),
      ),
    ),
    height: px(
      calc.add(
        themeTokens.density.minTargetSize,
        calc.multiply(2, themeTokens.outline.width.sm),
      ),
    ),
    outline: 'none',
    margin: 0,
    position: 'absolute',
    zIndex: 1,
    cursor: 'pointer',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: '50%',

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        cursor: 'default',
        pointerEvents: 'none',
      },
    },
  }),
  progressIndicator: {
    width: tokens.size,
    height: tokens.size,
  },
  overlay: {
    inset: 0,
    position: 'absolute',
  },
  background: ({ root }) => ({
    zIndex: 1,
    borderRadius: 'inherit',
    backgroundColor: tokens.background.color.normal,
    transitionProperty: 'transform, opacity',
    transitionDuration: `${themeTokens.motion.duration.short.$3}, ${themeTokens.motion.duration.short.$1}`,
    transitionTimingFunction: `${themeTokens.motion.easing.emphasized.accelerate}, linear`,
    transform: 'scale(0.6)',
    opacity: 0,

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the checkbox state
        // is programmatically  changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',
      },
      [getModifierSelector<IModifier>('focused', root)]: {
        backgroundColor: fallbackVar(
          tokens.background.color.focused,
          tokens.background.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        backgroundColor: fallbackVar(
          tokens.background.color.hovered,
          tokens.background.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        backgroundColor: fallbackVar(
          tokens.background.color.pressed,
          tokens.background.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        backgroundColor: fallbackVar(
          tokens.background.color.disabled,
          tokens.background.color.normal,
        ),
        opacity: tokens.background.opacity.disabled,
      },
      [getModifierSelector<IModifier>('was-disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the checkbox state
        // is programmatically  changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',
      },
      [getModifierSelector<IModifier>(['checked'], root)]: {
        transitionDuration: `${themeTokens.motion.duration.medium.$3}, ${themeTokens.motion.duration.short.$1}`,
        transitionTimingFunction: `${themeTokens.motion.easing.emphasized.decelerate}, linear`,
        transform: 'scale(1)',
        opacity: 1,
        backgroundColor: fallbackVar(
          tokens.background$checked.color.normal,
          tokens.background.color.normal,
        ),
      },
      [getModifierSelector<IModifier>(['checked', 'focused'], root)]: {
        backgroundColor: fallbackVar(
          tokens.background$checked.color.focused,
          tokens.background$checked.color.normal,
        ),
      },
      [getModifierSelector<IModifier>(['checked', 'hovered'], root)]: {
        backgroundColor: fallbackVar(
          tokens.background$checked.color.hovered,
          tokens.background$checked.color.normal,
        ),
      },
      [getModifierSelector<IModifier>(['checked', 'pressed'], root)]: {
        backgroundColor: fallbackVar(
          tokens.background$checked.color.pressed,
          tokens.background$checked.color.normal,
        ),
      },
      [getModifierSelector<IModifier>(['checked', 'disabled'], root)]: {
        // Set disabled opacity only when selected since opacity is used to show
        // or hide the container background.
        backgroundColor: fallbackVar(
          tokens.background$checked.color.disabled,
          tokens.background$checked.color.normal,
        ),
        opacity: tokens.background$checked.opacity.disabled,
      },
    },
  }),
  icon: ({ root }) => ({
    zIndex: 1,
    position: 'relative',
    // The icon is created with two <rect> marks for animation:
    // 1. Short end
    //   - the smaller leading part of the checkmark
    //   - hidden behind long end for indeterminate mark
    // 2. Long end
    //   - the larger trailing part of the checkmark
    //   - the entirety of the indeterminate mark
    width: tokens.iconSize,
    height: tokens.iconSize,
    fill: tokens.icon$checked.color.normal,
    transitionProperty: 'transform, opacity',
    transitionDuration: `${themeTokens.motion.duration.short.$3}, ${themeTokens.motion.duration.short.$1}`,
    transitionTimingFunction: `${themeTokens.motion.easing.emphasized.accelerate}, linear`,
    transform: 'scale(0.6)',
    opacity: 0,

    selectors: {
      [getModifierSelector<IModifier>('checked', root)]: {
        transitionDuration: `${themeTokens.motion.duration.medium.$3}, ${themeTokens.motion.duration.short.$1}`,
        transitionTimingFunction: `${themeTokens.motion.easing.emphasized.decelerate}, linear`,
        transform: 'scale(1)',
        opacity: 1,
      },
      [getModifierSelector<IModifier>('focused', root)]: {
        fill: fallbackVar(
          tokens.icon$checked.color.focused,
          tokens.icon$checked.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('hovered', root)]: {
        fill: fallbackVar(
          tokens.icon$checked.color.hovered,
          tokens.icon$checked.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('pressed', root)]: {
        fill: fallbackVar(
          tokens.icon$checked.color.pressed,
          tokens.icon$checked.color.normal,
        ),
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the checkbox state
        // is programmatically  changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',

        fill: fallbackVar(
          tokens.icon$checked.color.disabled,
          tokens.icon$checked.color.normal,
        ),
        opacity: tokens.icon$checked.opacity.disabled,
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
  mark: ({ root }) => ({
    animationDuration: themeTokens.motion.duration.short.$3,
    animationTimingFunction: themeTokens.motion.easing.emphasized.accelerate,
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.accelerate,

    selectors: {
      [getModifierSelector<IModifier>('checked', root)]: {
        // Enter duration and easing.
        animationDuration: themeTokens.motion.duration.medium.$3,
        animationTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the checkbox state
        // is programmatically  changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',
      },
      [getModifierSelector<IModifier>('was-disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the checkbox state
        // is programmatically  changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',
      },
      [getModifierSelector<IModifier>('was-unchecked', root)]: {
        // When selecting an unselected checkbox, don't transition between the
        // checked and indeterminate states. The checkmark icon or indeterminate
        // icon should fade in from its final position.
        transitionProperty: 'none',
      },
    },
  }),
  mark$short: {
    // The short end of the checkmark. Initially hidden underneath the
    // indeterminate mark.
    width: tokens.mark.stroke,
    height: tokens.mark.stroke,
    transitionProperty: 'transform, height',
  },
  mark$long: ({ root }) => ({
    // FIXME: The long end of the checkmark. Initially the indeterminate mark.
    width: px(10),
    height: tokens.mark.stroke,
    transitionProperty: 'transform, width',

    selectors: {
      [getModifierSelector<IModifier>(['was-unchecked', 'checked'], root)]: {
        animationName: prevUnselectedToCheckedKeyframes,
      },
    },
  }),
  checkMark: {
    // Transform from the bottom left of the rectangles, which turn into the
    // bottom-most point of the checkmark. Fix Safari's transform-origin bug
    // from "top left" to "bottom left" Move the "bottom left" corner to the
    // checkmark location. Rotate the checkmark.
    transform: `scaleY(-1) translate(${checkMarkBottomLeft}) rotate(45deg)`,
  },
  checkMark$short: {
    // The right triangle that forms the short end has an X, Y length of 4dp,
    // 4dp. The hypoteneuse is √(4*4 + 4*4), which is the length of the short
    // end when checked.
    height: Math.sqrt(32),
  },
  checkMark$long: {
    // The right triangle that forms the long end has an X, Y length of 8dp,
    // 8dp. The hypoteneuse is √(8*8 + 8*8), which is the length of the long end
    // when checked.
    width: Math.sqrt(128),
  },
  indeterminate: {
    transform: `scaleY(-1) translate(${indeterminateBottomLeft}) rotate(0deg)`,
  },
});

export type ICheckboxThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const checkboxTheme = componentThemeFactory<ICheckboxThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
