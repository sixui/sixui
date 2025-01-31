import type { ICardVariant } from '~/components/Card';
import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { Card } from '~/components/Card';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { typography } from '~/utils/css/typography';
import { COMPONENT_NAME } from './CheckboxCard.constants';

type IModifier = IInteraction | 'disabled' | 'checked';

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
