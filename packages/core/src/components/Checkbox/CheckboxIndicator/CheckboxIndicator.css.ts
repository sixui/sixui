import { fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { Checkmark } from '~/components/Checkmark';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './CheckboxIndicator.constants';

type IModifier = IInteraction | 'disabled' | 'on' | 'was-disabled' | 'loading';

const DENSITY = px(density({ min: -1, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    shape: px(2),
    size: px(18),
  },
  mark: {
    stroke: '3px',
  },
  container$off: {
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
  container$on: {
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
  icon: {
    size: px(12),
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
});

const classNames = createStyles({
  root: {
    width: calc.add(tokens.container.size, DENSITY),
    height: calc.add(tokens.container.size, DENSITY),
    display: 'flex',
    placeContent: 'center',
    placeItems: 'center',

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        shape: tokens.container.shape,
        color: tokens.container$off.color.normal,
      },
      outline: {
        color: themeTokens.colorScheme.onSurfaceVariant,
        width: px(themeTokens.outline.width.sm),
      },
    }),

    selectors: {
      [modifierSelector<IModifier>({ loading: true })]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          outline: {
            width: px(themeTokens.outline.width.none),
          },
        }),
      },
      [modifierSelector<IModifier>({ hovered: true })]: {
        zIndex: 1,
      },
      [modifierSelector<IModifier>({ on: true, disabled: true })]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          outline: {
            width: px(themeTokens.outline.width.none),
          },
        }),
      },
      [modifierSelector<IModifier>({ disabled: true })]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            opacity: themeTokens.state.opacity.disabled,
          },
          outline: {
            color: tokens.container$on.color.disabled,
            opacity: tokens.container$on.opacity.disabled,
          },
        }),
      },
    },
  },
  progressIndicator: {
    width: calc.add(tokens.container.size, DENSITY),
    height: calc.add(tokens.container.size, DENSITY),
  },
  layer: {
    position: 'absolute',
    inset: 0,
  },
  background: ({ root }) => ({
    zIndex: 1,
    borderRadius: 'inherit',
    backgroundColor: 'unset',
    transitionProperty: 'transform, opacity',
    transitionDuration: `${themeTokens.motion.duration.short3}, ${themeTokens.motion.duration.short1}`,
    transitionTimingFunction: `${themeTokens.motion.easing.emphasized.accelerate}, linear`,
    transform: 'scale(0.6)',

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the
        // checkboxIndicator state is programmatically changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',
      },
      [modifierSelector<IModifier>('focused', root)]: {
        backgroundColor: tokens.container$off.color.focused,
      },
      [modifierSelector<IModifier>('hovered', root)]: {
        backgroundColor: tokens.container$off.color.hovered,
      },
      [modifierSelector<IModifier>('pressed', root)]: {
        backgroundColor: tokens.container$off.color.pressed,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        backgroundColor: tokens.container$off.color.disabled,
        opacity: tokens.container$off.opacity.disabled,
      },
      [modifierSelector<IModifier>('on', root)]: {
        transitionDuration: `${themeTokens.motion.duration.medium3}, ${themeTokens.motion.duration.short1}`,
        transitionTimingFunction: `${themeTokens.motion.easing.emphasized.decelerate}, linear`,
        transform: 'scale(1)',
        opacity: 1,
        backgroundColor: tokens.container$on.color.normal,
      },
      [modifierSelector<IModifier>(['on', 'focused'], root)]: {
        backgroundColor: fallbackVar(
          tokens.container$on.color.focused,
          tokens.container$on.color.normal,
        ),
      },
      [modifierSelector<IModifier>(['on', 'hovered'], root)]: {
        backgroundColor: fallbackVar(
          tokens.container$on.color.hovered,
          tokens.container$on.color.normal,
        ),
      },
      [modifierSelector<IModifier>(['on', 'pressed'], root)]: {
        backgroundColor: fallbackVar(
          tokens.container$on.color.pressed,
          tokens.container$on.color.normal,
        ),
      },
      [modifierSelector<IModifier>(['on', 'disabled'], root)]: {
        animationDuration: '0s',
        transitionDuration: '0s',
        // Set disabled opacity only when selected since opacity is used to show
        // or hide the container background.
        backgroundColor: fallbackVar(
          tokens.container$on.color.disabled,
          tokens.container$on.color.normal,
        ),
        opacity: tokens.container$on.opacity.disabled,
      },
      [modifierSelector<IModifier>('was-disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the checkbox state
        // is programmatically changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',
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
    width: tokens.icon.size,
    height: tokens.icon.size,
    fill: tokens.icon.color.normal,
    transitionProperty: 'transform, opacity',
    transitionDuration: `${themeTokens.motion.duration.short3}, ${themeTokens.motion.duration.short1}`,
    transitionTimingFunction: `${themeTokens.motion.easing.emphasized.accelerate}, linear`,
    transform: 'scale(0.6)',
    opacity: 0,

    vars: overrideTokens(Checkmark.theme.tokens, {
      color: tokens.icon.color.normal,
      stroke: tokens.mark.stroke,
    }),

    selectors: {
      [modifierSelector<IModifier>('on', root)]: {
        transitionDuration: `${themeTokens.motion.duration.medium3}, ${themeTokens.motion.duration.short1}`,
        transitionTimingFunction: `${themeTokens.motion.easing.emphasized.decelerate}, linear`,
        transform: 'scale(1)',
        opacity: 1,
      },
      [modifierSelector<IModifier>('focused', root)]: {
        fill: fallbackVar(tokens.icon.color.focused, tokens.icon.color.normal),
      },
      [modifierSelector<IModifier>('hovered', root)]: {
        fill: fallbackVar(tokens.icon.color.hovered, tokens.icon.color.normal),
      },
      [modifierSelector<IModifier>('pressed', root)]: {
        fill: fallbackVar(tokens.icon.color.pressed, tokens.icon.color.normal),
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the
        // checkboxIndicator state is programmatically changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',

        fill: fallbackVar(tokens.icon.color.disabled, tokens.icon.color.normal),
        opacity: tokens.icon.opacity.disabled,
      },
      [modifierSelector<IModifier>('was-disabled', root)]: {
        // Don't animate to/from disabled states because the outline is hidden
        // when selected. Without this, there'd be a FOUC if the checkbox state
        // is programmatically changed while disabled.
        animationDuration: '0s',
        transitionDuration: '0s',
      },
    },
  }),
});

export type ICheckboxIndicatorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const checkboxIndicatorTheme =
  componentThemeFactory<ICheckboxIndicatorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
