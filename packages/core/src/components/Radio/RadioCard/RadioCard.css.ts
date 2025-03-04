import type { ICardVariant } from '~/components/Card';
import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { Card } from '~/components/Card';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { typography } from '~/utils/css/typography';
import { themeTokens } from '~/components/Theme/theme.css';
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

    vars: overrideTokens(Card.theme.tokens, {
      container: {
        color: {
          normal: themeTokens.colorScheme.surfaceContainerHigh,
        },
      },
    }),
    selectors: {
      [modifierSelector<IModifier>('checked')]: {
        vars: overrideTokens(Card.theme.tokens, {
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
    ...typography(tokens.supportingText.typography),

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
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
