import { keyframes } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './RadioIndicator.constants';

type IModifier = IInteraction | 'disabled' | 'loading' | 'checked';

const DENSITY = px(density({ min: -1, max: 0 }));

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

    vars: overrideTokens(PaperBase.theme.tokens, {
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
      [modifierSelector<IModifier>('loading')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          outline: {
            width: px(themeTokens.outline.width.none),
          },
        }),
      },
      [modifierSelector<IModifier>('disabled')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          outline: {
            opacity: themeTokens.state.opacity.disabled,
          },
        }),
      },
      [modifierSelector<IModifier>('hovered')]: {
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
      [modifierSelector<IModifier>({ checked: false }, root)]: {
        fill: tokens.icon.color.normal,
      },
      [modifierSelector<IModifier>(
        {
          checked: false,
          focused: true,
        },
        root,
      )]: {
        fill: tokens.icon.color.focused,
      },
      [modifierSelector<IModifier>(
        {
          checked: false,
          hovered: true,
        },
        root,
      )]: {
        fill: tokens.icon.color.hovered,
      },
      [modifierSelector<IModifier>(
        {
          checked: false,
          pressed: true,
        },
        root,
      )]: {
        fill: tokens.icon.color.pressed,
      },
      [modifierSelector<IModifier>(
        {
          checked: false,
          disabled: true,
        },
        root,
      )]: {
        fill: tokens.icon.color.disabled,
        opacity: tokens.icon.opacity.disabled,
      },
      [modifierSelector<IModifier>({ checked: true }, root)]: {
        fill: tokens.icon$checked.color.normal,
      },
      [modifierSelector<IModifier>(
        {
          checked: true,
          focused: true,
        },
        root,
      )]: {
        fill: tokens.icon$checked.color.focused,
      },
      [modifierSelector<IModifier>(
        {
          checked: true,
          hovered: true,
        },
        root,
      )]: {
        fill: tokens.icon$checked.color.hovered,
      },
      [modifierSelector<IModifier>(
        {
          checked: true,
          pressed: true,
        },
        root,
      )]: {
        fill: tokens.icon$checked.color.pressed,
      },
      [modifierSelector<IModifier>(
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
      [modifierSelector<IModifier>({ checked: true }, root)]: {
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
