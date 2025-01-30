import type { ICardVariant } from '~/components/Card';
import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { Card } from '~/components/Card';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { COMPONENT_NAME } from './RadioCard.constants';

type IModifier = IInteraction | 'disabled' | 'loading' | 'checked';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
