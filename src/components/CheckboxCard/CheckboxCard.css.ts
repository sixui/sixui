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

type IModifier = IInteraction | 'disabled' | 'checked';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  supportingText: {
    typography: themeTokens.typeScale.body.sm,
  },
});

const classNames = createStyles({
  root: {
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
              disabled: px(themeTokens.outline.width.xs),
            },
          },
        }),
      },
    },
  },
  supportingText: {
    ...getTypographyStyles(tokens.supportingText.typography),
  },
});

export type ICheckboxCardThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
  tokens: typeof tokens;
  variant: ICardVariant;
}>;

export const checkboxCardTheme =
  componentThemeFactory<ICheckboxCardThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
