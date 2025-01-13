import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier =
  | 'has-error'
  | 'completed'
  | 'active'
  | 'disabled'
  | 'icon-only';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    size: px(24),
    shape: themeTokens.shape.corner.circle,
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
    width: tokens.container.size,
    height: tokens.container.size,
    fontSize: tokens.container.size,

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        shape: tokens.container.shape,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>(['!active', '!completed', '!has-error'])]:
        {
          vars: createTokensVars(PaperBase.theme.tokens, {
            container: {
              color: tokens.container.color.inactive,
              opacity: tokens.container.opacity.inactive,
            },
          }),
        },
      [getModifierSelector<IModifier>('active')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.active,
          },
        }),
      },
      [getModifierSelector<IModifier>('icon-only')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: 'transparent',
            opacity: tokens.icon.opacity.inactive,
          },
        }),
      },
      [getModifierSelector<IModifier>(['completed', '!icon-only'])]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.completed,
          },
        }),
      },
      [getModifierSelector<IModifier>(['has-error', '!icon-only'])]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.error,
          },
        }),
      },
      [getModifierSelector<IModifier>(['disabled', '!icon-only'])]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.disabled,
            opacity: tokens.container.opacity.disabled,
          },
        }),
      },
    },
  },
  icon: ({ root }) => ({
    selectors: {
      [getModifierSelector<IModifier>(
        ['!active', '!completed', '!has-error'],
        root,
      )]: {
        color: tokens.icon.color.inactive,
        fill: tokens.icon.color.inactive,
        opacity: tokens.icon.opacity.inactive,
      },
      [getModifierSelector<IModifier>('active', root)]: {
        color: tokens.icon.color.active,
        fill: tokens.icon.color.active,
      },
      [getModifierSelector<IModifier>('completed', root)]: {
        color: tokens.icon.color.completed,
        fill: tokens.icon.color.completed,
      },
      [getModifierSelector<IModifier>('has-error', root)]: {
        color: tokens.icon.color.error,
        fill: tokens.icon.color.error,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.icon.color.disabled,
        fill: tokens.icon.color.disabled,
        opacity: tokens.icon.opacity.disabled,
      },
    },
  }),
  label: ({ root }) => ({
    ...getTypographyStyles(tokens.label.typography),
    color: tokens.label.color.inactive,
    opacity: tokens.label.opacity.inactive,

    selectors: {
      [getModifierSelector<IModifier>('completed', root)]: {
        color: tokens.label.color.completed,
      },
      [getModifierSelector<IModifier>('has-error', root)]: {
        color: tokens.label.color.error,
      },
      [getModifierSelector<IModifier>('active', root)]: {
        color: tokens.label.color.active,
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: tokens.label.opacity.disabled,
      },
    },
  }),
});

export type IStepIndicatorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const stepIndicatorTheme =
  componentThemeFactory<IStepIndicatorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
