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
  | 'inactive'
  | 'disabled'
  | 'icon-only';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    size: px(24),
    shape: themeTokens.shape.corner.circle,
    color: {
      normal: themeTokens.colorScheme.primary,
      completed: themeTokens.colorScheme.primary,
      error: themeTokens.colorScheme.error,
      inactive: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      inactive: '0.16',
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  label: {
    typography: themeTokens.typeScale.label.md,
    color: {
      normal: themeTokens.colorScheme.onPrimary,
      completed: themeTokens.colorScheme.onPrimary,
      error: themeTokens.colorScheme.onError,
      inactive: themeTokens.colorScheme.onSurface,
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
    color: tokens.label.color.normal,
    fill: tokens.label.color.normal,

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color.normal,
        shape: tokens.container.shape,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('icon-only')]: {
        color: tokens.container.color.normal,
        fill: tokens.container.color.normal,

        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: 'transparent',
          },
        }),
      },

      [getModifierSelector<IModifier>('completed')]: {
        color: tokens.container.color.completed,
        fill: tokens.container.color.completed,
      },
      [getModifierSelector<IModifier>(['completed', '!icon-only'])]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.completed,
          },
        }),
      },
      [getModifierSelector<IModifier>('has-error')]: {
        color: tokens.container.color.error,
        fill: tokens.container.color.error,
      },
      [getModifierSelector<IModifier>(['has-error', '!icon-only'])]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.error,
          },
        }),
      },
      [getModifierSelector<IModifier>('inactive')]: {
        color: tokens.container.color.inactive,
        fill: tokens.container.color.inactive,
      },
      [getModifierSelector<IModifier>(['inactive', 'icon-only'])]: {
        opacity: tokens.container.opacity.inactive,
      },
      [getModifierSelector<IModifier>(['inactive', '!icon-only'])]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.inactive,
            opacity: tokens.container.opacity.inactive,
          },
        }),
      },
      [getModifierSelector<IModifier>('disabled')]: {
        color: tokens.container.color.disabled,
        fill: tokens.container.color.disabled,
      },
      [getModifierSelector<IModifier>(['disabled', 'icon-only'])]: {
        opacity: tokens.container.opacity.disabled,
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
  label: ({ root }) => ({
    ...getTypographyStyles(tokens.label.typography),
    color: tokens.label.color.normal,

    selectors: {
      [getModifierSelector<IModifier>('completed', root)]: {
        color: tokens.label.color.completed,
      },
      [getModifierSelector<IModifier>('has-error', root)]: {
        color: tokens.label.color.error,
      },
      [getModifierSelector<IModifier>('inactive', root)]: {
        color: tokens.label.color.inactive,
        opacity: tokens.label.opacity.inactive,
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
