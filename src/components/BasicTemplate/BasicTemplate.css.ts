import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { cssLayers, themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    color: {
      normal: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  label: {
    typography: themeTokens.typeScale.label.md,
    color: {
      normal: themeTokens.colorScheme.onPrimary,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
});

const classNames = createStyles({
  root: {
    padding: px(space(2)),

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color.normal,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
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
    color: tokens.label.color.normal,

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: tokens.label.opacity.disabled,
      },
    },
  }),
});

export type IBasicTemplateThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const basicTemplateTheme =
  componentThemeFactory<IBasicTemplateThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
