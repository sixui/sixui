import { keyframes } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './RadioIndicator.constants';

type IModifier = 'disabled' | 'loading' | 'checked' | 'with-error';

const DENSITY = px(density({ min: -1, max: 0 }));

const innerCircleGrowKeyframes = keyframes({
  '0%': { transform: 'scale(0)' },
  '100%': { transform: 'scale(1)' },
});

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    shape: px(themeTokens.shape.corner.circle),
    size: px(18),
    color: {
      normal: 'transparent',
      error: 'transparent',
    },
  },
  icon$checked: {
    color: {
      normal: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
      error: themeTokens.colorScheme.error,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  outline: {
    width: px(themeTokens.outline.width.sm),
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      error: themeTokens.colorScheme.error,
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
        color: tokens.container.color.normal,
        shape: tokens.container.shape,
      },
      outline: {
        color: tokens.outline.color.normal,
        width: px(themeTokens.outline.width.sm),
      },
    }),

    selectors: {
      [modifierSelector<IModifier>('loading')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          outline: {
            width: px(0),
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
      [modifierSelector<IModifier>(['!disabled', 'with-error'])]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.error,
          },
          outline: {
            color: tokens.outline.color.error,
          },
        }),
      },
    },
  },
  progressIndicator: {
    width: calc.add(tokens.container.size, DENSITY),
    height: calc.add(tokens.container.size, DENSITY),
  },
  icon: ({ root }) => ({
    inset: 0,
    position: 'absolute',

    selectors: {
      [modifierSelector<IModifier>({ checked: true }, root)]: {
        fill: tokens.icon$checked.color.normal,
      },
      [modifierSelector<IModifier>({ disabled: true }, root)]: {
        opacity: tokens.icon$checked.opacity.disabled,
      },
      [modifierSelector<IModifier>(
        {
          checked: true,
          'with-error': true,
          disabled: false,
        },
        root,
      )]: {
        fill: tokens.icon$checked.color.error,
      },
      [modifierSelector<IModifier>(
        {
          checked: true,
          disabled: true,
        },
        root,
      )]: {
        fill: tokens.icon$checked.color.disabled,
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
