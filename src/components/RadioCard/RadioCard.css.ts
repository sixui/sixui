import { createTheme } from '@vanilla-extract/css';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { ICardVariant } from '../Card';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Card } from '../Card';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = IInteraction | 'disabled' | 'loading' | 'checked';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  supportingText: {
    typography: themeTokens.typeScale.body.sm,
  },
});

const classNames = createStyles({
  root: {
    textAlign: 'left',

    vars: createTokensVars(Card.theme.tokens, {
      container: {
        color: {
          normal: themeTokens.colorScheme.surfaceContainerHigh,
        },
      },
    }),
    selectors: {
      [getModifierSelector<IModifier>('checked')]: {
        vars: createTokensVars(Card.theme.tokens, {
          outline: {
            color: {
              normal: themeTokens.colorScheme.primary,
            },
            width: {
              normal: px(themeTokens.outline.width.sm),
              disabled: px(themeTokens.outline.width.sm),
            },
          },
        }),
      },
    },
  },
  supportingText: ({ root }) => ({
    ...getTypographyStyles(tokens.supportingText.typography),

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        opacity: themeTokens.state.opacity.disabled,
      },
    },
  }),
});

export type IRadioCardThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
  tokens: typeof tokens;
  variant: ICardVariant;
}>;

export const RadioCardTheme = componentThemeFactory<IRadioCardThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
