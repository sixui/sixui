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
import { typography } from '~/utils/css/typography';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './StepperStepIndicator.constants';

type IModifier =
  | 'has-error'
  | 'completed'
  | 'active'
  | 'disabled'
  | 'icon-only';

const DENSITY = px(density({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    size: px(24),
    shape: px(themeTokens.shape.corner.circle),
    color: {
      inactive: themeTokens.colorScheme.onSurface,
      active: themeTokens.colorScheme.primary,
      completed: themeTokens.colorScheme.primary,
      error: themeTokens.colorScheme.error,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      inactive: '0.16',
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  icon: {
    size: px(18),
    color: {
      inactive: themeTokens.colorScheme.onSurface,
      active: themeTokens.colorScheme.primary,
      completed: themeTokens.colorScheme.primary,
      error: themeTokens.colorScheme.error,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      inactive: themeTokens.state.opacity.disabled,
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  label: {
    typography: themeTokens.typeScale.label.md,
    color: {
      inactive: themeTokens.colorScheme.onSurface,
      active: themeTokens.colorScheme.onPrimary,
      completed: themeTokens.colorScheme.onPrimary,
      error: themeTokens.colorScheme.onError,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      inactive: '1',
      disabled: themeTokens.state.opacity.disabled,
    },
  },
});

const classNames = createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: calc.add(tokens.container.size, DENSITY),
    height: calc.add(tokens.container.size, DENSITY),
    fontSize: calc.add(tokens.container.size, DENSITY),

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        shape: tokens.container.shape,
      },
    }),

    selectors: {
      [modifierSelector<IModifier>(['!active', '!completed', '!has-error'])]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.inactive,
            opacity: tokens.container.opacity.inactive,
          },
        }),
      },
      [modifierSelector<IModifier>('active')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.active,
          },
        }),
      },
      [modifierSelector<IModifier>('icon-only')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: 'transparent',
            opacity: tokens.icon.opacity.inactive,
          },
        }),
      },
      [modifierSelector<IModifier>(['completed', '!icon-only'])]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.completed,
          },
        }),
      },
      [modifierSelector<IModifier>(['has-error', '!icon-only'])]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.error,
          },
        }),
      },
      [modifierSelector<IModifier>(['disabled', '!icon-only'])]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.disabled,
            opacity: tokens.container.opacity.disabled,
          },
        }),
      },
    },
  },
  icon: ({ root }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

    fontSize: tokens.icon.size,
    inlineSize: tokens.icon.size,
    blockSize: tokens.icon.size,

    selectors: {
      [modifierSelector<IModifier>(
        ['!active', '!completed', '!has-error'],
        root,
      )]: {
        color: tokens.icon.color.inactive,
        fill: tokens.icon.color.inactive,
        opacity: tokens.icon.opacity.inactive,
      },
      [modifierSelector<IModifier>('active', root)]: {
        color: tokens.icon.color.active,
        fill: tokens.icon.color.active,
      },
      [modifierSelector<IModifier>('completed', root)]: {
        color: tokens.icon.color.completed,
        fill: tokens.icon.color.completed,
      },
      [modifierSelector<IModifier>('has-error', root)]: {
        color: tokens.icon.color.error,
        fill: tokens.icon.color.error,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.icon.color.disabled,
        fill: tokens.icon.color.disabled,
        opacity: tokens.icon.opacity.disabled,
      },
    },
  }),
  label: ({ root }) => ({
    ...typography(tokens.label.typography),
    color: tokens.label.color.inactive,
    opacity: tokens.label.opacity.inactive,

    selectors: {
      [modifierSelector<IModifier>('completed', root)]: {
        color: tokens.label.color.completed,
      },
      [modifierSelector<IModifier>('has-error', root)]: {
        color: tokens.label.color.error,
      },
      [modifierSelector<IModifier>('active', root)]: {
        color: tokens.label.color.active,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: tokens.label.opacity.disabled,
      },
    },
  }),
});

export type IStepperStepIndicatorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const stepperStepIndicatorTheme =
  componentThemeFactory<IStepperStepIndicatorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
