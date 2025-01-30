import { keyframes } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/ThemeProvider';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { COMPONENT_NAME } from './RadioIndicator.constants';

type IModifier = IInteraction | 'disabled' | 'loading' | 'checked';

const DENSITY = px(getDensity({ min: -1, max: 0 }));

const innerCircleGrowKeyframes = keyframes({
  '0%': { transform: 'scale(0)' },
  '100%': { transform: 'scale(1)' },
});

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    shape: px(themeTokens.shape.corner.circle),
    size: px(18),
    color: 'transparent',
  },
  icon: {
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      focused: themeTokens.colorScheme.onSurface,
      hovered: themeTokens.colorScheme.onSurface,
      pressed: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  icon$checked: {
    color: {
      normal: themeTokens.colorScheme.primary,
      focused: themeTokens.colorScheme.primary,
      hovered: themeTokens.colorScheme.primary,
      pressed: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
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
    color: themeTokens.colorScheme.onSurfaceVariant,

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        shape: tokens.container.shape,
      },
      outline: {
        color: themeTokens.colorScheme.onSurfaceVariant,
        width: px(themeTokens.outline.width.sm),
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('loading')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          outline: {
            width: px(themeTokens.outline.width.none),
          },
        }),
      },
      [getModifierSelector<IModifier>('disabled')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          outline: {
            opacity: themeTokens.state.opacity.disabled,
          },
        }),
      },
      [getModifierSelector<IModifier>('hovered')]: {
        zIndex: 1,
      },
    },
  },
  progressIndicator: {
    width: tokens.container.size,
    height: tokens.container.size,
  },
  icon: ({ root }) => ({
    inset: 0,
    position: 'absolute',

    selectors: {
      [getModifierSelector<IModifier>({ checked: false }, root)]: {
        fill: tokens.icon.color.normal,
      },
      [getModifierSelector<IModifier>(
        {
          checked: false,
          focused: true,
        },
        root,
      )]: {
        fill: tokens.icon.color.focused,
      },
      [getModifierSelector<IModifier>(
        {
          checked: false,
          hovered: true,
        },
        root,
      )]: {
        fill: tokens.icon.color.hovered,
      },
      [getModifierSelector<IModifier>(
        {
          checked: false,
          pressed: true,
        },
        root,
      )]: {
        fill: tokens.icon.color.pressed,
      },
      [getModifierSelector<IModifier>(
        {
          checked: false,
          disabled: true,
        },
        root,
      )]: {
        fill: tokens.icon.color.disabled,
        opacity: tokens.icon.opacity.disabled,
      },
      [getModifierSelector<IModifier>({ checked: true }, root)]: {
        fill: tokens.icon$checked.color.normal,
      },
      [getModifierSelector<IModifier>(
        {
          checked: true,
          focused: true,
        },
        root,
      )]: {
        fill: tokens.icon$checked.color.focused,
      },
      [getModifierSelector<IModifier>(
        {
          checked: true,
          hovered: true,
        },
        root,
      )]: {
        fill: tokens.icon$checked.color.hovered,
      },
      [getModifierSelector<IModifier>(
        {
          checked: true,
          pressed: true,
        },
        root,
      )]: {
        fill: tokens.icon$checked.color.pressed,
      },
      [getModifierSelector<IModifier>(
        {
          checked: true,
          disabled: true,
        },
        root,
      )]: {
        fill: tokens.icon$checked.color.disabled,
        opacity: tokens.icon$checked.opacity.disabled,
      },
    },
  }),
  circle: {
    transitionDuration: themeTokens.motion.duration.short1,
    transitionTimingFunction: 'linear',
  },
  circle$inner: ({ root }) => ({
    opacity: 0,
    transformOrigin: 'center',
    transitionProperty: 'opacity',

    selectors: {
      [getModifierSelector<IModifier>({ checked: true }, root)]: {
        animationName: innerCircleGrowKeyframes,
        animationDuration: themeTokens.motion.duration.medium2,
        animationTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
        opacity: 1,
      },
    },
  }),
});

export type IRadioIndicatorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const RadioIndicatorTheme =
  componentThemeFactory<IRadioIndicatorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
